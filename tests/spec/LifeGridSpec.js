describe('LifeGrid', function() {
	var factory;

	beforeEach(function() {
	});

	describe('construct', function() {
		var defaultInput = [
				['1', '0', '1'],
				['1', '0', '1'],
				['1', '0', '1']
			];

		it('should be able to create a grid of cells', function() {
				var actualOutput = new LifeGrid(defaultInput),
					firstCell = actualOutput.cellGrid[0][0];
				expect(firstCell instanceof LifeCell).toEqual(true);
				expect(firstCell.isAlive()).toEqual(true);
			}
		);
	});
});