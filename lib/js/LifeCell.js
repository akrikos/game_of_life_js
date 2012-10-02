/**
 * Understands what it means to be alive/dead and how to figure out if this cell will be alive in the next cycle given
 *  a list of its neighbors
 *
 * @param startsAlive
 * @return {LifeCell}
 * @constructor
 */
function LifeCell(startsAlive) {
	this._isAliveNow = startsAlive;
	this._willBeAlive = null;
	this._neighbors = [];
	return this;
}

LifeCell.prototype.config = {
	minimumToSustain: 2,
	procreateRange: [3, 3],
	minimumToOvercrowd: 4
};

/**
 * Returns true if this cell is currently alive
 *
 * @return {boolean}
 */
LifeCell.prototype.isAlive = function() {
	return this._isAliveNow;
};

/**
 * Adds another cell as a neighbor to this cell
 *
 * @param neighbor
 * @return {LifeCell}
 */
LifeCell.prototype.addNeighbor = function(neighbor) {
	this._neighbors.push(neighbor);
	return this;
};

/**
 * Returns boolean true if this cell will be alive for the next cycle, false if not
 *  Sets up internal values for starting the next cycle
 *
 * @return {LifeCell}
 */
LifeCell.prototype.prepareNextCycle = function() {
	var self = this,
		liveNeighborCount = 0;
	$.each(this._neighbors, function() {
		if (this.isAlive()) {
			liveNeighborCount++;
		}
	});
	this._calculateNextLifeCycle(liveNeighborCount);
	return this;
};

/**
 * Starts the next game of life cycle for this cell (sets the values for the next cycle as the current values)
 *
 * @return {LifeCell}
 */
LifeCell.prototype.nextCycle = function() {
	this._isAliveNow = this._willBeAlive;
	return this;
};

/**
 * Figures out if this cell will be alive during the next cycle
 *
 * @param liveNeighborCount
 * @return {*}
 * @private
 */
LifeCell.prototype._calculateNextLifeCycle = function(liveNeighborCount) {
	if (this.isAlive()) {
		if (liveNeighborCount < this.config.minimumToSustain || liveNeighborCount >= this.config.minimumToOvercrowd) {
			this._willBeAlive = false;
		} else {
			this._willBeAlive = true;
		}
	} else {
		if (liveNeighborCount >= this.config.procreateRange[0] && liveNeighborCount <= this.config.procreateRange[1]) {
			this._willBeAlive = true;
		} else {
			this._willBeAlive = false;
		}
	}
	return this._willBeAlive;
};
