define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {
  var Menu = function() {
    this.template = _.template($('#tmpl-menu').html())
    $(document).on('click', '.menu .retry', function() {
      app.trigger('game:start')
      app.popup.close()
    })
  }

  var defaultOptions = {
  }

  _.extend(Menu.prototype, {
    show: function(options) {
      app.popup.open({
        html: this.template(_.extend(defaultOptions, options))
      })
    }
  })

  return new Menu()
})