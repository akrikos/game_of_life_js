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

LifeGrid.prototype._addNeighbors = function(cell, x, y) {
	for (var outer = y - 1; outer <= y + 1; outer++) {
		for (var inner = x - 1; inner <= x + 1; inner++) {
			if (outer !== y || inner !== x) {
				cell.addNeighbor(this._cellGrid[this._translateCoordinate(outer, this._height)][this._translateCoordinate(inner, this._width)]);
			}
		}
	}
};

LifeGrid.prototype.init = function() {
	//set up neighbor relationships
	for(var y = 0; y < this._height; y++) {
		for(var x = 0; x < this._width; x++) {
			this._addNeighbors(this._cellGrid[y][x], x, y);
		}
	}
	return this;
};

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