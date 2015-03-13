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
      this.$el.html('')
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
        this.end()
        app.trigger('game:over')
      }, this)
    }
  , end: function() {
      this.collection.each(function(model) {
        if(model.get('isMine') && !model.get('flag')) {
          model.explode()
        }
      })
      summary.show()
      this.collection.off('add game:over')
    }
  })

  return MainView
})