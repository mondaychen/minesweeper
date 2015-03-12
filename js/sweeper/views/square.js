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
    , 'contextmenu': 'flag'
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
  , flag: function(e) {
      e.preventDefault()
      this.model.set('flag', !this.model.get('flag'))
    }
  , _renderHidden: function() {
      var content = '<div class="cover">'
        + (this.model.get('flag') ? '<i class="icon icon-flag"></i>' : '')
        + '</div>'

      this.square.html(content)
      return this
    }
  , _renderMine: function() {
      this.square.html('<i class="icon icon-mine"></i>')
      return this
    }
  , _renderNumber: function() {
      var number = this.model.get('number')
      this.square.addClass('open-'+number).html(number || '')
      return this
    }
  })

  return MainView
})