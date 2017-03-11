/** yutube.js **/

function Youtube (data, key) {
	this.value = data;
	this.key = key;
}

Youtube.prototype.value = {}

Youtube.prototype.setValidated = function (validated) {
	this.value.validated = validated;
}

module.exports = Youtube;