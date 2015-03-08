define([
  'jquery'
, 'underscore'
, 'backbone'
], function ($, _, Backbone) {

  var keymap = [
    { name: 'left',  keyCodes: [37, 72], opposite: 'right' } // h
  , { name: 'up',    keyCodes: [38, 75], opposite: 'down'  } // k
  , { name: 'right', keyCodes: [39, 76], opposite: 'left'  } // l
  , { name: 'down',  keyCodes: [40, 74], opposite: 'up'    } // j
  ]

  var doc = $(document)

  var Keyboard = function(advancedMode) {
    this.direction = null
    this._advancedMode = advancedMode

    _.bindAll(this, '_onKeyup')
  }
  _.extend(Keyboard.prototype, Backbone.Events, {
    wake: function() {
      if(this._isAwake) {
        return this
      }
      doc.on('keyup.Keyboard', this._onKeyup)
      this._isAwake = true
      return this
    }
  , sleep: function() {
      doc.off('.Keyboard')
      this._isAwake = false
      return this
    }
  , reset: function() {
      this.direction = null
    }
  , config: function(advancedMode) {
      this._advancedMode = advancedMode
    }
  , _onKeyup: function(e) {
      var currentKey = _.find(keymap, function(key) {
        return _.some(key.keyCodes, function(keyCode) {
          return keyCode === e.keyCode
        })
      })

      if(!currentKey) {
        return
      }
      if(!this._advancedMode) {
        this.trigger('confirm', currentKey.name)
        this.reset()
        return
      }
      if(!this.direction) {
        this.direction = currentKey.name
        this.trigger('preview', currentKey.name)
        return
      }
      if(this.direction === currentKey.name) {
        this.trigger('confirm', this.direction)
        this.reset()
      } else if(this.direction === currentKey.opposite) {
        this.trigger('cancel', this.direction)
        this.reset()
      }
    }
  })

  return Keyboard
})