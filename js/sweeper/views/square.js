define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {
  var MainView = Backbone.View.extend({
    className: 'grid'
  , initialize: function() {
    }
  , render: function() {
      this.$el.html('<div class="square"></div>')
      this.square = this.$el.find('.square')
      this.square.html(this.model.get('isMine') ? 'M' : this.model.get('index'))
      return this
    }
  })

  return MainView
})