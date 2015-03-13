/* A simple overlay to prevent events when a game ends */

define([
  'jquery'
, 'underscore'
, 'backbone'
], function ($, _, Backbone) {
  var Overlay = Backbone.View.extend({
    id: 'game-overlay'
  , bindTo: function(target) {
      this.target = target
    }
  , show: function() {
      this.$el.css({
        height: this.target.height()
      , width: this.target.width()
      , 'z-index': 900
      , position: 'absolute'
      }).offset(this.target.offset()).show()
    }
  , hide: function() {
      this.$el.hide()
    }
  })

  return Overlay
})