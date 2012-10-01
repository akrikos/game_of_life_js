describe('GridFactory', function() {
	var factory;

	beforeEach(function() {
	});

	describe('buildGrid', function() {
		var defaultInput = "1110\n1101\n1100";

		it('should be able to parse a grid', function() {
				var expectedOutput = [
						['1','1','1','0'],
						['1','1','0','1'],
						['1','1','0','0']
					],
					actualOutput = GridFactory._buildArrayGrid(defaultInput);
				expect(actualOutput).toEqual(expectedOutput);
			}
		);

		it('should throw an exception on a non-rectangular grid', function() {
				var input1 = defaultInput.slice(0, defaultInput.length - 1),
					input2 = defaultInput.slice(1, defaultInput.length);
				expect(function() {
					GridFactory._buildArrayGrid(input1);
				}).toThrow('Input grid must be rectangular. Row 3 was a different length from the previous rows');
				expect(function() {
					GridFactory._buildArrayGrid(input2);
				}).toThrow('Input grid must be rectangular. Row 2 was a different length from the previous rows');
			}
		);
	});
});