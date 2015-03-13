define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
, 'sweeper/views/game'
, 'sweeper/views/overlay'
], function($, _, Backbone, app, GameView, Overlay) {
  var MainView = Backbone.View.extend({
    id: 'main'
  , template: $('#tmpl-main').html()
  , initialize: function() {
      var self = this
      app.on('game:start', function(options) {
        self.startGame(options)
      }).on('game:over game:win', function() {
        self.endGame()
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
      this.overlay = new Overlay()
      this.overlay.bindTo(this.gameView.$el)
      this.board.append(this.overlay.render().el)
    }
  , startGame: function() {
      this.$el.css({
        width: app.config.rows * 30 + 1 + "px"
      , height: app.config.columns * 30 + 1 + "px"
      })
      this.gameView.start(app.config)
      this.overlay.hide()
    }
  , endGame: function() {
      this.overlay.show()
    }
  })

  return MainView
})