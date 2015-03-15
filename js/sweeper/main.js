define([
  'jquery'
, 'underscore'
, 'backbone'
, 'bowser'
, 'mod/timer'
, 'sweeper/app'
, 'sweeper/views/main'
, 'sweeper/views/utils/popup'
, 'sweeper/views/utils/menu'
], function($, _, Backbone, bowser, Timer, app, MainView, popup, menu) {

  function initialize() {
    app.wrapper = $('#wrapper')

    app.timer = new Timer()

    var mainView = new MainView()
    app.wrapper.html(mainView.render().el)

    app.popup = popup

    $('.popup-link').click(function(e) {
      e.preventDefault()
      var link = $(this)
      popup.open({
        html: $('#' + link.data('content-id')).html()
      })
    })

    var _gamelevels = {
      easy: {rows: 9, columns: 9, mines: 10, name: 'Easy'}
    , medium: {rows: 16, columns: 16, mines: 40, name: 'Medium'}
    , hard: {rows: 16, columns: 30, mines: 99, name: 'Hard'}
    }

    app.levels = {
      all: function() {
        return _.clone(_gamelevels)
      }
    , get: function(key) {
        return _.clone(_gamelevels[key])
      }
    , _current: 'easy'
    , use: function(key) {
        this._current = key
        app.config = this.get(key)
      }
    , currentLevel: function() {
        return this._current
      }
    }
    app.levels.use('easy')

    app.menu = menu
    $('.menu-popup-link').click(function(e) {
      e.preventDefault()
      menu.show()
    })

    app.trigger('game:start')
  }

  return {
    initialize: initialize
  }
})
