define([
  'jquery'
, 'underscore'
, 'backbone'
], function($, _, Backbone) {
  var App = function() {
  }

  _.extend(App.prototype, Backbone.Events)

  return new App()
})
