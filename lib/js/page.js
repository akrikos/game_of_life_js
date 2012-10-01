LifeGrid.prototype.config.wrapping = false;

$(document).ready(function() {
	var input = $('#life_input'),
		output = $('#life_output'),
		button = $('#calculate');

	$('#wrap_config').on('change', function() {
		LifeGrid.prototype.config.wrapping = $('option:selected', this).val() === 'true';
	});

	button.on('click', function() {
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