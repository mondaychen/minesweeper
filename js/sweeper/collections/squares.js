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
      var self = this

      this.on('change', function(model) {
        if(model.changed.flag
          || (model.changed.isOpen && !model.get('isMine'))) {
          this.checkWin()
        }
      }, this)
    }
  , setup: function(options) {
      var self = this
      var mineCount = this.mineCount = options.mines
      var total = options.rows * options.columns
      var minesArr = []
      for (var i = 0; i < total; i++) {
        minesArr.push(i < mineCount)
      }
      minesArr = _.shuffle(minesArr)
      var matrix = this.matrix = new Matrix(options.rows, options.columns)
      this.indicate(minesArr)
      _.each(this.minesMap, function(value, idx) {
        self.add({
          index: idx
        , number: _.isNumber(value) ? value : ''
        , isMine: value == 'M'
        })
        self.percolator
      })
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
      return this.getModelByIdx(this.matrix.getIndex(position))
    }
  , getModelByIdx: function(idx) {
      // TODO: possible efficiency improvements
      return this.find(function(model) {
        return model.get('index') === idx
      })
    }
  })

  return SquaresCollection
})