define([
  'jquery'
, 'underscore'
, 'backbone'
, 'sweeper/app'
], function($, _, Backbone, app) {

  var defaults = {
    isOpen: false,
    isMine: false,
    flag: false,
    number: 0,
    index: 0
  }

  var Square = Backbone.Model.extend({
    initialize: function(attrs, options) {
      this.set(_.extend(defaults, attrs))
    }
  , open: function(safeMode) {
      var self = this
      _.defer(function() {
        if(self.get('flag')) {
          return
        }
        if(!safeMode && self.get('isMine')) {
          self.set('killer', true)
          self.trigger('game:over')
          return
        }
        if(self.get('isOpen')) {
          return
        }
        self.set('isOpen', true)
        if(!self.get('isMine') && self.get('number') === 0) {
          _.invoke(self.getNeighbour8(), 'open', true)
        }
        self.trigger('open')
      })
    }
  , openNeighbours: function() {
      if(this.get('number') === 0 || this.get('flag') || !this.get('isOpen')) {
        return
      }
      var neighbours = this.getNeighbour8()
      var flagCount = _.filter(neighbours, function(model) {
        return model.get('flag')
      }).length || 0
      if(flagCount === this.get('number')) {
        _.invoke(neighbours, 'open')
      }
    }
  , getNeighbour8: function() {
      var self = this
      var neighbours = this.collection.matrix.getNeighbour8ByIdx(this.get('index'))
      return _.map(neighbours, function(neighbour) {
        return self.collection.getModelByPosition(neighbour)
      })
    }
  , explode: function() {
      if(!this.get('isMine')) {
        return
      }
      this.set('isOpen', true)
    }
  })

  return Square
})