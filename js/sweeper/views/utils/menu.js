define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {

  var Menu = function() {
    this.template = _.template($('#tmpl-menu').html())
    $(document).on('click', '.menu .retry', this.restartGame)
  }

  _.extend(Menu.prototype, {
    show: function() {
      var el = $(this.template({
        levels: app.levels.all()
      , currentLevel: app.levels.currentLevel()
      }))
      var levels = el.find('.level [data-level]')
      levels.click(function(e) {
        e.preventDefault()
        var level = $(this)
        levels.removeClass('selected')
        level.addClass('selected')
        app.levels.use(level.data('level'))
      })

      app.popup.open({
        html: el
      })
    }
  , restartGame: function() {
      app.trigger('game:start')
      app.popup.close()
    }
  })

  return new Menu()
})