define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
, 'sweeper/collections/squares'
, 'sweeper/views/square'
, 'sweeper/views/utils/summary'
], function($, _, Backbone, app, SquaresCollection, SquareView, summary) {
  var MainView = Backbone.View.extend({
    id: 'gaming'
  , initialize: function() {
      this.collection = new SquaresCollection()
    }
  , render: function() {
      this.$el.empty()
      return this
    }
  , start: function(options) {
      var self = this
      this.render()
      this.collection.reset()
      this.collection.on('add', function(model, collection) {
        var view = new SquareView({model: model})
        self.$el.append(view.render().el)
      })
      this.collection.setup(options)
      this.collection.on('game:over', function() {
        app.trigger('game:over')
      })

      app.on('game:over', function() {
        self.gameOver()
      }).on('game:win', function() {
        self.gameWin()
      })
    }
  , gameOver: function() {
      this.collection.each(function(model) {
        if(model.get('isMine') && !model.get('flag')) {
          model.explode()
        }
      })
      this.endGame()
      // wait for the animation
      _.delay(function() {
        summary.show()
      }, 1000)
    }
  , gameWin: function() {
      summary.show({success: true})
      this.endGame()
    }
  , endGame: function() {
      this.collection.off('add')
      app.off('game:over game:win')
    }
  })

  return MainView
})