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
    show: function(options) {
      var el = $(this.template(options))
      var currentLevel = el.find('.level [data-level="' + app.config.level + '"]')
      currentLevel.addClass('selected')
      var levels = currentLevel.siblings().andSelf()
      levels.click(function(e) {
        e.preventDefault()
        var level = $(this)
        levels.removeClass('selected')
        level.addClass('selected')
        _.extend(app.config, {
          level: level.data('level')
        , rows: level.data('rows')
        , columns: level.data('columns')
        , mines: level.data('mines')
        })
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