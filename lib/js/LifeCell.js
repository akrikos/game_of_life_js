function LifeCell(startsAlive) {
	this._isAliveNow = startsAlive;
	this._willBeAlive = null;
	this._neighbors = [];
	return this;
}
LifeCell.prototype.config = {
	sustain: [2, 3],
	procreate: [3, 3],
	overcrowd: [4]
};

LifeCell.prototype.isAlive = function() {
	return this._isAliveNow;
};

LifeCell.prototype.prepareNextCycle = function() {
//TODO
};

LifeCell.prototype.nextCycle = function() {
	this._isAliveNow = this._willBeAlive;
	return this;
};

LifeCell.prototype.addNeighbor = function(neighbor) {
	this._neighbors.push(neighbor);
	return this;
};