define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {
  var MainView = Backbone.View.extend({
    className: 'grid'
  , events: {
      'click': 'open'
    }
  , initialize: function() {
      this.model.on('change', this.render, this)
    }
  , render: function() {
      this.$el.html('<div class="square"></div>')
      this.square = this.$el.find('.square')
      this.square.html(this.model.get('isMine') ? 'M' : this.model.get('number'))
      if(this.model.get('isOpen')) {
        this.square.addClass('open')
      }
      return this
    }
  , open: function() {
      if(this.model.get('isMine')) {
        this.model.trigger('game:over')
        return
      }
      if(this.model.get('number') >= 0) {
        this.model.open()
      }
    }
  })

  return MainView
})