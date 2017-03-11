
// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app) {

	app.get('/', function(req, res) {
	    res.sendfile('./public/index.html'); // load index
	});
};