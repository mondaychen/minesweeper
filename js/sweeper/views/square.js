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
      this.model.on('change', this.update, this)
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
  , open: function() {
      if(this.model.get('isMine')) {
        this.model.set('killer', true)
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