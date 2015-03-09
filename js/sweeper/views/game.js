define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
, 'sweeper/collections/squares'
, 'sweeper/views/square'
], function($, _, Backbone, app, SquaresCollection, SquareView) {
  var MainView = Backbone.View.extend({
    id: 'gaming'
  , initialize: function() {
      this.collection = new SquaresCollection()
    }
  , render: function() {
      return this
    }
  , start: function(options) {
      var self = this
      this.collection.on('add', function(model, collection) {
        var view = new SquareView({model: model})
        self.$el.append(view.render().el)
      })
      this.collection.setup(options)
    }
  })

  return MainView
})