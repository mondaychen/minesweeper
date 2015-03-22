define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {
  var MainView = Backbone.View.extend({
    className: 'grid'
  , events: {
      'MB_click': 'open'
    , 'MB_enter': 'enter'
    , 'MB_leave': 'leave'
    , 'dblclick': '_openNeighbours'
    , 'contextmenu': 'preventDefault'
    }
  , initialize: function() {
      this.model.on('change', this.update, this)
        .on('preview', this._preview, this)
      _.bindAll(this, '_open')
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
  , update: function(model) {
      if("flag" in model.changed && _.size(model.changed)) {
        return this._makeFlag()
      }
      return this.render()
    }
  , open: function(e, button) {
      if(button === 'left') {
        if(!app.firstClick) {
          app.trigger('first_click', this.model.get('index'), this._open)
          app.firstClick = true
          return
        }
        this._open()
      } else if(button === 'right'){
        if(!this.model.get('isOpen')) {
          this.model.set('flag', !this.model.get('flag'))
        }
      } else if(button === 'both') {
        this._openNeighbours()
      }
    }
  , _open: function() {
      if(this.model.get('number') >= 0) {
        this.model.open()
      }
    }
  , _openNeighbours: function() {
      this.model.openNeighbours()
    }
  , enter: function(e, button) {
      if(button === 'left' || button === 'right') {
        this.square.addClass('hover')
      } else if(button === 'both') {
        _.invoke(this.model.getNeighbour8(), 'trigger', 'preview')
        this._preview()
      }
    }
  , leave: function() {
      // TODO: should find a better way to do this
      $('.square').removeClass('hover preview')
    }
  , _preview: function() {
      this.square.addClass('preview')
    }
  , preventDefault: function(e) {
      e.preventDefault()
    }
  , _renderHidden: function() {
      var content = '<div class="cover"></div>'
      this.square.html(content)
      return this._makeFlag()
    }
  , _makeFlag: function() {
      var action = this.model.get('flag') ? 'addClass' : 'removeClass'
      this.square.find('.cover')[action]('icon icon-flag')
      return this
    }
  , _renderMine: function() {
      this.square.html('<i class="icon icon-mine"></i>')
      var self = this
      _.defer(function() {
        if(self.model.get('killer')) {
          self.square.addClass('killer')
        }
      })
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