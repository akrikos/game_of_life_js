describe('LifeGrid', function() {
	beforeEach(function() {
		LifeGrid.prototype.config.wrapping = true; //reset to default before every run
	});

	describe('construct', function() {
		var defaultInput = [
				['1', '0', '1'],
				['1', '0', '1'],
				['1', '0', '1']
			];

		it('should be able to create a grid of cells', function() {
			var actualOutput = new LifeGrid(defaultInput),
				shouldBeLiveCell = actualOutput._cellGrid[0][0],
				shouldBeDeadCell = actualOutput._cellGrid[0][1];
			expect(shouldBeLiveCell instanceof LifeCell).toEqual(true);
			expect(shouldBeLiveCell.isAlive()).toEqual(true);
			expect(shouldBeDeadCell.isAlive()).toEqual(false);
		});

		it('should set up internal neighbor relationships correctly', function() {
			var input = [
				['1', '1', '1', '0'],
				['1', '0', '1', '0'],
				['1', '1', '1', '0']
			];
			var grid = new LifeGrid(input).init(),
				internalCell = grid._cellGrid[1][1],
				liveCount = 0;
			$.each(internalCell._neighbors, function() {
				if (this.isAlive()) {
					liveCount++;
				}
			});
			expect(liveCount).toEqual(8);
		});

		it('should set up wrapping neighbor relationships correctly with wrapping turned on', function() {
			LifeGrid.prototype.config.wrapping = true;
			var input = [
				['1', '1', '0', '1'],
				['1', '1', '0', '1'],
				['0', '1', '0', '1']
			];
			var grid = new LifeGrid(input).init(),
				internalCell = grid._cellGrid[2][0],
				liveCount = 0;
			$.each(internalCell._neighbors, function() {
				if (this.isAlive()) {
					liveCount++;
				}
			});
			expect(liveCount).toEqual(8);
		});
		it('should set up wrapping neighbor relationships correctly with wrapping turned off', function() {
			LifeGrid.prototype.config.wrapping = false;
			var input = [
				['1', '1', '0', '1'],
				['1', '1', '0', '1'],
				['0', '1', '0', '1']
			];
			var grid = new LifeGrid(input).init(),
				internalCell = grid._cellGrid[2][0],
				liveCount = 0;
			$.each(internalCell._neighbors, function() {
				if (this.isAlive()) {
					liveCount++;
				}
			});
			expect(liveCount).toEqual(3);
		});
	});

	describe('_translateCoordinate', function() {
		//just so we don't have to set one up for each test -- contents don't matter
		var grid = new LifeGrid([['1']]);

		it('should translate a request inside the bounds correctly', function() {
			expect(grid._translateCoordinate(1, 3)).toEqual(1);
		});
		it('should translate a request on the  boundary correctly', function() {
			expect(grid._translateCoordinate(1, 2)).toEqual(1);
			expect(grid._translateCoordinate(0, 2)).toEqual(0);
		});
		it('should translate a request over the boundary correctly', function() {
			expect(grid._translateCoordinate(-1, 2)).toEqual(1);
			expect(grid._translateCoordinate(2, 2)).toEqual(0);
		});
	});

	describe('getTextGrid', function() {
		var input = [
			['1', '1', '1', '0'],
			['1', '0', '1', '0'],
			['1', '1', '1', '0']
		];

		it('should return a correct text representation of the input', function() {
			var grid = new LifeGrid(input),
				expectedOutput = '1110\n1010\n1110\n';
			expect(grid.getTextGrid()).toEqual(expectedOutput);
		});
	});

	describe('nextCycle', function() {
		it('should calculate the next cycle correctly', function() {
			var input = [
					['1', '1', '1', '1'],
					['0', '0', '0', '0'],
					['0', '0', '0', '0']
				],
				grid = new LifeGrid(input).init(),
				expectedOutput = '1111\n1111\n1111\n';
			expect(grid.nextCycle().getTextGrid()).toEqual(expectedOutput);
		});
	});
});