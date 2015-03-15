define([
  'underscore'
, 'backbone'
], function(_, Backbone) {

  var Timer = function() {
    this.stopwatch = 0
  }
  _.extend(Timer.prototype, Backbone.Events, {
    start: function() {
      this.stopwatch = 0
      this._setInterval()
    }
  , stop: function() {
      this._clearInterval()
    }
  , time: function() {
      return this.stopwatch
    }
  , _setInterval: function() {
      var self = this
      this.timeoutID = setInterval(function() {
        self.stopwatch++
        self.trigger('tick', self.stopwatch)
      }, 1000)
    }
  , _clearInterval: function() {
      clearInterval(this.timeoutID)
    }
  })

  return Timer
})