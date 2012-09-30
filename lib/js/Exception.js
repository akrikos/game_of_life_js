function GenericException(message) {
	this.prototype = Error.prototype;
	this.name = 'Generic error';
	this.message = message;
	return this;
}