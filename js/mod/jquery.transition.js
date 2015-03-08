;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {

  var initialValue = 'all 0 ease 0';

  var defaults = {
    duration: 0,
    timing: 'ease',
    delay: 0,
    property: null, // String or Array here
    callback: $.noop
  };

  $.fn.transition = function (styles, options) {
    // init setttings
    styles = styles || {};
    var settings = $.extend( {}, defaults, options );
    var _p = settings.property; // for short
    if(_p) {
      settings.property = $.isArray(_p) ? _p : [_p];
    }

    var $this = $(this);
    var self = this

    // only pick the properties of the styles if not defined by user
    var props = settings.property || styles;
    var transitionValues = $.map(props, function(value, prop) {
      return [ prop, settings.duration + 's',
        settings.timing, settings.delay + 's' ].join(' ');
    }).join(',');
    $this.css('transition', transitionValues).css(styles);
    // set back to initial value
    setTimeout(function() {
      $this.css('transition', initialValue);
      if($.isFunction(settings.callback)) {
        settings.callback.call(self);
      }
    }, settings.duration * 1000);
  };

  $.transition = function () {
    $.fn.transition.apply(arguments[0],
      Array.prototype.slice.call(arguments, 1))
  };

  return $.transition
}));