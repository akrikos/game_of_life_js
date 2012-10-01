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

LifeCell.prototype.isAlive = function() {
	return this._isAliveNow;
};

LifeCell.prototype.prepareNextCycle = function() {
	var self = this,
		liveNeighborCount = 0;
	$.each(this._neighbors, function() {
		if (this.isAlive()) {
			liveNeighborCount++;
		}
	});
	if (this.isAlive()) {
		if (liveNeighborCount < this.config.minimumToSustain) {
			this._willBeAlive = false;
		} else if (liveNeighborCount >= this.config.minimumToOvercrowd) {
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
};

LifeCell.prototype.nextCycle = function() {
	this._isAliveNow = this._willBeAlive;
	return this;
};

LifeCell.prototype.addNeighbor = function(neighbor) {
	this._neighbors.push(neighbor);
	return this;
};