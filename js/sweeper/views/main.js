define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
, 'sweeper/views/game'
], function($, _, Backbone, app, GameView) {
  var MainView = Backbone.View.extend({
    id: 'main'
  , template: $('#tmpl-main').html()
  , initialize: function() {
      var self = this
      app.on('game:start', function(options) {
        self.startGame(options)
      })
    }
  , render: function() {
      this.$el.html(this.template)
      this.board = this.$el.find('.board')
      this._initGame()

      return this
    }
  , _initGame: function() {
      this.gameView = new GameView()
      this.board.html(this.gameView.render().el)
    }
  , startGame: function(options) {
      this.$el.css({
        width: options.rows * 30 + 1 + "px"
      , height: options.columns * 30 + 1 + "px"
      })
      this.gameView.start(options)
    }
  })

  return MainView
})