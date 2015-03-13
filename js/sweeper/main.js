define([
  'jquery'
, 'underscore'
, 'backbone'
, 'bowser'
, 'sweeper/app'
, 'sweeper/views/main'
, 'sweeper/views/utils/popup'
], function($, _, Backbone, bowser, app, MainView, popup) {

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

    app.trigger('game:start', {rows: 9, columns: 9, mines: 10})
  }

  return {
    initialize: initialize
  }
})
