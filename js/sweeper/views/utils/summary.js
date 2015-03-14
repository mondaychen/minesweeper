define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {
  var Summary = function() {
    this.template = _.template($('#tmpl-playing-summary').html())
    $(document).on('click', '.summary .retry', function() {
      app.trigger('game:start')
      app.popup.close()
    })
  }

  var defaultOptions = {
    success: false
  }

  _.extend(Summary.prototype, {
    show: function(options) {
      app.popup.open({
        html: this.template(_.defaults(options || {}, defaultOptions))
      })
    }
  })

  return new Summary()
})