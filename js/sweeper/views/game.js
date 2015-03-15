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

      var self = this
      this.collection.on('game:over', function() {
        app.trigger('game:over')
        self.gameOver()
      }).on('game:win', function() {
        app.trigger('game:win')
        self.gameWin()
      }).on('add', function(model, collection) {
        var view = new SquareView({model: model})
        self.$el.append(view.render().el)
      }).on('game:update_flags', function(data) {
        self.trigger('game:update_flags', data)
      })
    }
  , render: function() {
      this.$el.empty()
      return this
    }
  , start: function(options) {
      var self = this
      this.endGame()
      this.render()
      this.collection.reset()
      this.collection.setup(options)
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
    }
  })

  return MainView
})