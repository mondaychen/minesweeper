define([
  'jquery'
, 'underscore'
], function($, _) {
  function MouseButton () {
    this.states = ['none', 'left', 'right', 'both']
    this._left = false
    this._right = false
    this._currentTarget = null
    this._init()
  }

  _.extend(MouseButton.prototype, {
    _init: _.once(function() {
      var self = this
      var onMove = function(e) {
        if(e.target === this._currentTarget) {
          return
        }
        if(this._currentTarget) {
          $(this._currentTarget).trigger('MB_leave', self.getButton())
        }
        this._currentTarget = e.target
        var target = $(e.target)
        target.trigger('MB_enter', self.getButton())
      }
      var onDown = function(e) {
        if(e.button === 0) {
          self._left = true
        } else if(e.button === 2) {
          self._right = true
        } else {
          self._left = false
          self._right = false
        }
        
        var target = $(e.target)
        target.trigger('MB_enter', self.getButton())
      }
      var onUp = function(e) {
        var target = $(e.target)
        target.trigger('MB_click', self.getButton())
        self._left = false
        self._right = false
        $(this._currentTarget).trigger('MB_leave', self.getButton())
      }
      $(document).on('mousedown', onDown).on('mousemove', onMove)
        .on('mouseup', onUp)
    })
  , getButton: function() {
      var i = (this._left ? 1 : 0) + (this._right ? 2: 0)
      return this.states[i]
    }
  })

  return new MouseButton()
})