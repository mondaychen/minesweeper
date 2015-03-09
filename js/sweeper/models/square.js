define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {

  var defaults = {
  }

  var Square = Backbone.Model.extend({
    initialize: function(attrs, options) {
      this.set(_.extend(defaults, attrs))
    }
  })

  return Square
})