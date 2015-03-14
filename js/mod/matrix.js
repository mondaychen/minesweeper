 define('mod/matrix', [], function() {
  function Matrix (rows, columns) {
    this.rows = rows
    this.columns = columns
  }

  Matrix.prototype = _.extend(Matrix.prototype, {
    getPosition: function(index) {
      var columns = index % this.columns
      var rows = (index - columns) / this.columns
      return [rows, columns]
    }
  , getIndex: function(position) {
      var i = position[0], j = position[1]
      this.validate(i, j)
      return i * this.columns + j
    }
  , getNeighbour4: function(position) {
      var i = position[0], j = position[1]
      var rtn = []
      if(i > 0) {
        rtn.push([i - 1, j])
      }
      if(j > 0) {
        rtn.push([i, j - 1])
      }
      if(i < this.rows - 1) {
        rtn.push([i + 1, j])
      }
      if(j < this.columns - 1) {
        rtn.push([i, j + 1])
      }
      return rtn
    }
  , getNeighbour8: function(position) {
      var rtn = this.getNeighbour4(position)
      var i = position[0], j = position[1]
      if(i > 0 && j > 0) {
        rtn.push([i - 1, j - 1])
      }
      if(i < this.rows - 1 && j > 0) {
        rtn.push([i + 1, j - 1])
      }
      if(i < this.rows - 1 && j < this.columns - 1) {
        rtn.push([i + 1, j + 1])
      }
      if(i > 0 && j < this.columns - 1) {
        rtn.push([i - 1, j + 1])
      }
      return rtn
    }
  , getNeighbour4ByIdx: function(idx) {
      return this.getNeighbour4(this.getPosition(idx))
    }
  , getNeighbour8ByIdx: function(idx) {
      return this.getNeighbour8(this.getPosition(idx))
    }
  , validate: function(i, j) {
      if (i < 0 || i >= this.rows) {
        throw new Error("row index " + i + " out of bounds");
      }
      if (j < 0 || j >= this.column) {
        throw new Error("column index " + j + " out of bounds");
      }
    }
  })

  return Matrix
 })