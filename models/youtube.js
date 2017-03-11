/** yutube.js **/

function Youtube (data, key) {
	this.data = data;
	this.key = key;
}

Youtube.prototype.data = {}

Youtube.prototype.setValidated = function (validated) {
	this.data.validated = validated;
}

module.exports = Youtube;