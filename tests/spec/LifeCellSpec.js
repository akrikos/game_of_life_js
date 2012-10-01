describe('LifeCell', function() {
	var cell;

	//reset config in test so that we can correctly test the algorithms with expected config values
	//no matter if the configs are changed on the object
	LifeCell.prototype.config = {
		minimumToSustain: 2,
		procreateRange: [3, 3],
		minimumToOvercrowd: 4
	};

	beforeEach(function() {
		cell = new LifeCell(true);
	});

	describe('construct', function() {
		it('should set liveliness correctly', function() {
				var liveCell = new LifeCell(true),
					deadCell = new LifeCell(false);
				expect(liveCell.isAlive()).toEqual(true);
				expect(deadCell.isAlive()).toEqual(false);
			}
		);
	});

	describe('addNeighbor', function() {
		it('should add a neighbor to the internal list', function() {
			var neighbor = new LifeCell(false),
				neighbor2 = new LifeCell(true);
			cell.addNeighbor(neighbor);
			expect(cell._neighbors[0]).toEqual(neighbor);
			cell.addNeighbor(neighbor2);
			expect(cell._neighbors[1]).toEqual(neighbor2);
		});
	});

	describe('prepareNextCycle', function() {
		it('should die if under sustain threshold', function() {
			cell.prepareNextCycle();
			expect(cell._willBeAlive).toEqual(false);
			cell.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(false));
			expect(cell._willBeAlive).toEqual(false);
		});

		it('should stay alive if within sustain threshold', function() {
			cell.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(false))
				.addNeighbor(new LifeCell(true));
			cell.prepareNextCycle();
			expect(cell._willBeAlive).toEqual(true);
			cell.addNeighbor(new LifeCell(true));
			expect(cell._willBeAlive).toEqual(true);
		});
		it('should be (re)born if within procreate threshold', function() {
			cell._isAliveNow = false;
			cell.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(false))
				.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(true));
			cell.prepareNextCycle();
			expect(cell._willBeAlive).toEqual(true);
		});
		it('should die if at the overcrowd threshold', function() {
			cell.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(false))
				.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(true))
				.addNeighbor(new LifeCell(true));
			cell.prepareNextCycle();
			expect(cell._willBeAlive).toEqual(false);
		});
	});

	describe('nextCycle', function() {
		it('should set current liveliness with the value that is staged for the next cycle', function() {
			var expectedLiveliness = false;
			cell._willBeAlive = expectedLiveliness;
			cell.nextCycle();
			expect(cell.isAlive()).toEqual(expectedLiveliness);
		});
	});
});