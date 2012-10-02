describe('SimpleLifeCycle', function() {
	var factory;

	beforeEach(function() {
	});

	describe('calculate', function() {
		var defaultInput =
			"01000\n" +
			"10011\n" +
			"11001\n" +
			"01000\n" +
			"10001";

		it('should give the expected output', function() {
				var expectedOutput =
					"00000\n" +
					"10111\n" +
					"11111\n" +
					"01000\n" +
					"00000\n";

				actualOutput = SimpleLifeCycle.calculate(defaultInput);
				expect(actualOutput).toEqual(expectedOutput);
			}
		);
	});
});