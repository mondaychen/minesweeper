define([], function () {
  var hasTouch = !!('ontouchstart' in window
    || window.DocumentTouch
    && document instanceof DocumentTouch)
  return {
    hasTouch: function() {
      return hasTouch
    }
  }
})