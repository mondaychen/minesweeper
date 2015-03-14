define([
  'jquery'
, 'underscore'
, 'backbone'
, 'bowser'
, 'sweeper/app'
, 'sweeper/views/main'
, 'sweeper/views/utils/popup'
, 'sweeper/views/utils/menu'
], function($, _, Backbone, bowser, app, MainView, popup, menu) {

  function initialize() {
    app.wrapper = $('#wrapper')

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

    app.menu = menu
    $('.menu-popup-link').click(function(e) {
      e.preventDefault()
      menu.show()
    })

    app.config = {rows: 9, columns: 9, mines: 10}

    app.trigger('game:start')
  }

  return {
    initialize: initialize
  }
})
