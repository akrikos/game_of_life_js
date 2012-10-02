$(document).ready(function() {
	var input = $('#life_input'),
		output = $('#life_output');

	LifeGrid.prototype.config.wrapping = false; //set the default for this page
	$('#wrap_config').on('change', function() {
		LifeGrid.prototype.config.wrapping = $('option:selected', this).val() === 'true';
	});

	$('#calculate').on('click', function() {
		try {
			var grid = GridFactory.buildGrid(input.val());
			grid.nextCycle();
			output.val(grid.getTextGrid());
		} catch (e) {
			if (e instanceof GenericException) {
				alert(e.message);
			} else {
				throw e;
			}
		}
	});
});
