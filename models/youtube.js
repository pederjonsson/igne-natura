/** yutube.js **/

var Youtube = function (data) {
	this.data = data;
}

Youtube.prototype.data = {}

Youtube.prototype.setValidated = function (validated) {
	this.data.validated = validated;
}

/*Youtube.findById = function (id, callback) {
db.get('users', {id: id}).run(function (err, data) {
if (err) return callback(err);
callback(null, new Youtube(data));
});
}*/

module.exports = Youtube;