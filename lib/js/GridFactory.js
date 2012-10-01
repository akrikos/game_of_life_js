var GridFactory = {
	buildGrid: function(input) {
		if (typeof input != "string") {
			throw new GenericException('Invalid input. Given start must be a string.');
		}
		var cellList = [],
			cellGrid = [],
			arrayGrid = this._buildArrayGrid(input);
		if (!arrayGrid.length) {
			throw new GenericException('Invalid input. Starting level must have at least some size.')
		}
		return new LifeGrid(arrayGrid).init();
	},

	/**
	 * Breaks the input grid into an array representation
	 *
	 * @param input
	 * @return two dimensional array
	 */
	_buildArrayGrid: function (input) {
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
	}
};