var SimpleLifeCycle = {
	config: {
		minimumToSustain: 2,
		procreateRange: [3, 3],
		minimumToOvercrowd: 4
	},

	/**
	 * Returns the next cycle of the game of life
	 *
	 * @param textGrid
	 * @return {String}
	 */
	calculate: function(textGrid) {
		var arrayGrid = this._buildArrayGrid(textGrid);
		return this._calculateNextCycle(arrayGrid);
	},

	/**
	 * Breaks the input grid into an array representation
	 *
	 * @param input
	 * @return two dimensional array
	 */
	_buildArrayGrid: function(input) {
		var textGrid = input.split('\n'),
			previousGridWidth = -1;
		for (var i = 0; i < textGrid.length; i++) {
			textGrid[i] = textGrid[i].split('');
			if (textGrid[i].length !== previousGridWidth && previousGridWidth !== -1) {
				throw new GenericException('Input grid must be rectangular. Row ' + (i + 1) + ' was a different length from the previous rows');
			}
			previousGridWidth = textGrid[i].length;
		}
		return textGrid;
	},

	/**
	 * Calculates the next cycle and returns it as a string with newlines
	 *
	 * @param arrayGrid
	 * @return {String}
	 * @private
	 */
	_calculateNextCycle: function(arrayGrid) {
		var nextCycle = '';
		for (var y = 0; y < arrayGrid.length; y++) {
			for (var x = 0; x < arrayGrid[y].length; x++) {
				nextCycle += this._calculateCell(arrayGrid, x, y) ? '1': '0';
			}
			nextCycle += "\n";
		}
		return nextCycle;
	},

	/**
	 * Calculates the next liveliness value for the given cell
	 *
	 * @param arrayGrid
	 * @param xCoordinate
	 * @param yCoordinate
	 * @return {boolean}
	 * @private
	 */
	_calculateCell: function(arrayGrid, xCoordinate, yCoordinate) {
		var liveNeighborCount = 0,
			currentlyAlive = !!parseInt(arrayGrid[yCoordinate][xCoordinate]);
		for (var y = yCoordinate - 1; y <= yCoordinate + 1; y++) {
			for (var x = xCoordinate - 1; x <= xCoordinate + 1; x++) {
				if (y !== yCoordinate || x !== xCoordinate) {
					if (this._isWithinBounds(x, y, arrayGrid[0].length, arrayGrid.length)) {
						liveNeighborCount += parseInt(arrayGrid[y][x]);
					}
				}
			}
		}
		return this._shouldBeAlive(currentlyAlive, liveNeighborCount);
	},

	/**
	 * Returns true if, given the number of live neighbors, this cell should be alive
	 *
	 * @param liveNeighborCount
	 * @return {*}
	 * @private
	 */
	_shouldBeAlive: function(cellIsAlive, liveNeighborCount) {
		if (cellIsAlive) {
			if (liveNeighborCount < this.config.minimumToSustain || liveNeighborCount >= this.config.minimumToOvercrowd) {
				return false;
			} else {
				return true;
			}
		} else {
			if (liveNeighborCount >= this.config.procreateRange[0] && liveNeighborCount <= this.config.procreateRange[1]) {
				return true;
			} else {
				return false;
			}
		}
		return this._willBeAlive;
	},

	/**
	 * Returns true if the requested coords are within the bounds of the grid
	 */
	_isWithinBounds: function(x, y, width, height) {
		return x >= 0 && x < width && y >= 0 && y < height;
	}
};