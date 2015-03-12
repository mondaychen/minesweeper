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
  , open: function() {
      var self = this
      if(this.get('isOpen') || this.get('isMine') || this.get('flag')) {
        return
      }
      this.set('isOpen', true)
      if(!this.get('isMine') && this.get('number') === 0) {
        var neighbours = this.collection.matrix.getNeighbour8ByIdx(this.get('index'))
        _.each(neighbours, function(neighbour) {
          var model = self.collection.getModelByPosition(neighbour)
          model.open()
        })
      }
      this.trigger('open')
    }
  })

  return Square
})