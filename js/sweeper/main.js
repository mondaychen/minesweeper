define([
  'jquery'
, 'underscore'
, 'backbone'
, 'bowser'
, 'sweeper/app'
, 'sweeper/views/main'
], function($, _, Backbone, bowser, app, MainView) {

  function initialize() {
    app.wrapper = $('#wrapper')

    var mainView = new MainView()
    app.wrapper.html(mainView.render().el)

    app.trigger('game:start', {rows: 9, columns: 9, mines: 10})
  }

  return {
    initialize: initialize
  }
})
