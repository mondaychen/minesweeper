define([
  'jquery'
, 'underscore'
, 'backbone'
, 'mod/matrix'
, 'sweeper/app'
, 'sweeper/models/square'
], function($, _, Backbone, Matrix, app, SquareModel) {

  var SquaresCollection = Backbone.Collection.extend({
    model: SquareModel
  , initialize: function(models, options) {
      this.on('change', function(model) {
        // ignore 'change' caused by game initialization
        if('number' in model.changed) {
          return
        }
        if(model.changed.flag
          || (model.changed.isOpen && !model.get('isMine'))) {
          this.checkWin()
        }
        if('flag' in model.changed) {
          this.trigger('game:update_flags', model.changed.flag ? -1 : 1)
        }
      }, this)
      // set up mine map after the first click
      app.on('first_click', function(clicked, callback) {
        this._setup(clicked, callback)
      }, this)
    }
  , setup: function(options) {
      this.mineCount = options.mines
      this.matrix = new Matrix(options.rows, options.columns)
      var total = options.rows * options.columns
      for(var i = 0; i < total; i++) {
        this.add({
          index: i
        })
      }
    }
  // after first click
  , _setup: function(clicked, callback) {
      var self = this
      var minesArr = []
      // randomly make the map, true for mine
      for (var i = 0; i < this.length; i++) {
        minesArr.push(i < this.mineCount)
      }
      minesArr = _.shuffle(minesArr)
      if(minesArr[clicked]) {
        var i = 0
        // find an innocent scapegoat to replace the mine
        var scapegoat = _.random(1, this.length - this.mineCount)
        while(scapegoat > 0) {
          if(!minesArr[i]) {
            scapegoat--
          }
          i++
        }
        minesArr[i-1] = true
        minesArr[clicked] = false
      }
      this.indicate(minesArr)
      _.each(this.minesMap, function(value, idx) {
        self.get(idx).set({
          number: _.isNumber(value) ? value : ''
        , isMine: value == 'M'
        })
      })
      callback()
    }
  , indicate: function(minesArr) {
      var self = this
      var minesMap = this.minesMap = []
      for (var i = minesArr.length - 1; i >= 0; i--) {
        minesMap[i] = minesArr[i] ? 'M' : 0
      }
      for (var i = minesArr.length - 1; i >= 0; i--) {
        if(minesArr[i]) {
          _.each(this.matrix.getNeighbour8ByIdx(i), function(position) {
            var idx = self.matrix.getIndex(position)
            if(_.isNumber(minesMap[idx])) {
              minesMap[idx]++
            }
          })
        }
      }
    }
  , checkWin: function() {
      var flaggedMines = 0
      var remainingSquares = 0
      var falsePositive = false
      // TODO: possible efficiency improvements
      this.each(function(model) {
        if(model.get('isMine') && model.get('flag')) {
          flaggedMines++
        }
        if(!model.get('isMine') && model.get('flag')) {
          falsePositive = true
        }
        if(!model.get('isOpen')) {
          remainingSquares++
        }
      })
      if(falsePositive) {
        return
      }
      if(this.mineCount === flaggedMines || this.mineCount === remainingSquares) {
        this.trigger('game:win')
      }
    }
  , getModelByPosition: function(position) {
      return this.get(this.matrix.getIndex(position))
    }
  })

  return SquaresCollection
})