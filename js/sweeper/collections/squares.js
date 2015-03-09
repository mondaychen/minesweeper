define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
, 'sweeper/models/square'
], function($, _, Backbone, app, SquareModel) {

  var SquaresCollection = Backbone.Collection.extend({
    model: SquareModel
  , initialize: function(models, options) {
      var self = this

      this.on('add', function(model) {
        
      }, this)
    }
  , setup: function(options) {
      var self = this
      var mineCount = options.mines
      var total = options.rows * options.columns
      var minesArr = []
      for (var i = 0; i < total; i++) {
        minesArr.push(i < mineCount)
      }
      minesArr = _.shuffle(minesArr)
      _.each(minesArr, function(value, idx) {
        self.add({
          index: idx
        , isMine: value
        })
      })
    }
  })

  return SquaresCollection
})