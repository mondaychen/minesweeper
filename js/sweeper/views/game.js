define([
  'jquery'
, 'underscore'
, 'backbone'
], function($, _, Backbone) {
  var MainView = Backbone.View.extend({
    id: 'gaming'
  , render: function() {
      return this
    }
  , start: function(options) {
      for(var i = 0; i < options.rows * options.columns; i++) {
        this.$el.append('<div class="grid">' +(i%9)+ '</div>')
      }
    }
  })

  return MainView
})