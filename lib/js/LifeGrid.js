/**
 * Understands a grid of LifeCells (the world) and how to create it from a 2 dimensional array of strings
 *
 * @param arrayGrid
 * @return {LifeGrid}
 * @constructor
 */
function LifeGrid(arrayGrid) {
	var self = this;
	this._cellGrid = [];
	this._cellList = [];
	this._height = arrayGrid.length;
	this._width = arrayGrid[0].length;
	$.each(arrayGrid, function() {
		var row = [];
		self._cellGrid.push(row);
		$.each(this, function() {
			var cell = new LifeCell(!!parseInt(this));
			self._cellList.push(cell);
			row.push(cell);
		});
	});
	return this;
}

LifeGrid.prototype.config = {
	wrapping: true //does the world wrap across the borders of the grid?
};

/**
 * Initializes the required relationships between cells
 *
 * @return {LifeGrid}
 */
LifeGrid.prototype.init = function() {
	for(var y = 0; y < this._height; y++) {
		for(var x = 0; x < this._width; x++) {
			this._addNeighbors(this._cellGrid[y][x], x, y);
		}
	}
	return this;
};

/**
 * Moves the game one cycle forward
 *
 * @return {LifeGrid}
 */
LifeGrid.prototype.nextCycle = function() {
	var self = this;
	$.each(this._cellList, function() {
		this.prepareNextCycle();
	});
	$.each(this._cellList, function() {
		this.nextCycle();
	});
	return this;
};

/**
 * Returns a text representation of the current state of the grid
 *
 * @return {String}
 */
LifeGrid.prototype.getTextGrid = function() {
	var self = this,
		textGrid = '';
	$.each(this._cellGrid, function() {
		$.each(this, function() {
			if (this.isAlive()) {
				textGrid += '1'
			} else {
				textGrid += '0'
			}
		});
		textGrid += '\n';
	});
	return textGrid;
};

/**
 * Adds the neighbors of the cell to that cell's list of neighbors
 *
 * @param cell
 * @param x
 * @param y
 * @private
 */
LifeGrid.prototype._addNeighbors = function(cell, x, y) {
	for (var outer = y - 1; outer <= y + 1; outer++) {
		for (var inner = x - 1; inner <= x + 1; inner++) {
			if (outer !== y || inner !== x) {
				if (this.config.wrapping) {
					cell.addNeighbor(this._cellGrid[this._translateCoordinate(outer, this._height)][this._translateCoordinate(inner, this._width)]);
				} else {
					if (this._isWithinBounds(inner, outer)) {
						cell.addNeighbor(this._cellGrid[outer][inner]);
					}
				}
			}
		}
	}
};

/**
 * Returns the actual coordinate within the grid when wrapping is turned on
 *
 * @param desiredPosition
 * @param maxLength
 * @return {int}
 * @private
 */
LifeGrid.prototype._translateCoordinate = function(desiredPosition, maxLength) {
	var actualPosition;
	if (desiredPosition < 0) {
		actualPosition = maxLength- 1;
	} else if (desiredPosition == maxLength) {
		actualPosition = 0;
	} else {
		actualPosition = desiredPosition;
	}
	return actualPosition;
};

/**
 * Returns true if the requested coords are within the bounds of the grid
 *
 * @param x
 * @param y
 * @return {Boolean}
 * @private
 */
LifeGrid.prototype._isWithinBounds = function(x, y) {
	return x >= 0 && x < this._width && y >= 0 && y < this._height;
};
