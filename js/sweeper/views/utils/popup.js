define([
  'jquery'
, 'underscore'
, 'backbone'
, 'magnific-popup'
], function($, _, Backbone, magnificPopup) {
  var Popup = function() {
    // global set up for magnificPopup
    $(document).on('click', '.my-mfp-close', function() {
      magnificPopup.close()
    }).on('click', '.my-mfp-next', function() {
      var instance = $.magnificPopup.instance
      instance.next()
    })
  }

  _.extend(Popup.prototype, Backbone.Events, {
    open: function(options) {
      options = _.extend({
        html: ''
      , callbacks: {}
      }, options)
      magnificPopup.open({
        items: {
          src: options.html
        , type: 'inline'
        }
      , removalDelay: 300
      , mainClass: 'mfp-fade-from-top'
      , callbacks: options.callbacks
      })
    }
  , openGallery: function(options) {
      options = _.extend({
        items: []
      , callbacks: {}
      }, options)
      magnificPopup.open({
        items: options.items
      , type: 'inline'
      , callbacks: options.callbacks
      , gallery:{
          enabled: true
        }
      , removalDelay: 300
      , mainClass: 'mfp-fade-from-top'
      })
    }
  })

  return new Popup()
})