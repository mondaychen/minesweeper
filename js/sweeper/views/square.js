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

      if(!this.model.get('isOpen')) {
        return this._renderHidden()
      }
      if(this.model.get('isMine')) {
        return this._renderMine()
      }
      return this._renderNumber()
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
  , _renderHidden: function() {
      this.square.html('<div class="cover"></div>')
      return this
    }
  , _renderMine: function() {
      this.square.html('<i class="icon icon-mine"></i>')
      return this
    }
  , _renderNumber: function() {
      this.square.html(this.model.get('number') || '')
      return this
    }
  })

  return MainView
})