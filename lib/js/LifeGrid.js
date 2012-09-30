function LifeGrid(arrayGrid) {
	var self = this;
	this.cellGrid = [];
	$.each(arrayGrid, function() {
		var row = [];
		self.cellGrid.push(row);
		$.each(this, function() {
			var cell = new LifeCell(!!this);
			row.push(cell);
		});
	});

	return this;
}
LifeGrid.prototype.nextCycle = function() {

};

LifeGrid.prototype.getTextGrid = function() {

};