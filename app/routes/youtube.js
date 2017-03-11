
var Youtube = require('../../models/youtube.js');
var youtubes = [];

// youtube routes ======================================================================
module.exports = function(app, tubesRef) {

	var youtubeArray = [];

	app.post('/api/youtube', function(req, res) {
	 	var newPostRef = tubesRef.push();
		newPostRef.set({
		  	youtubeId: req.body.youtubeId,
		  	validated: false,
		  	time: req.body.time,
		  	originalTitle: req.body.originalTitle,
		  	uploaded: Date.now()
		});

		tubesRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
	});

	app.get('/api/youtubes', function(req, res) {
		console.log("getyoutubes called");
		tubesRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.get('/api/youtube/:key', function(req, res) {
		var tube = Youtube.getByKey(youtubes, req.params.key);
		res.send(tube);
	});

	app.put('/api/youtube/:tube_id/:validated', function(req, res) {
		var tube = tubesRef.child(req.params.tube_id);
		tube.update({
		  	"validated": req.params.validated
		});
		tubesRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.get('/api/youtubes/unvalidated', function(req, res) {
		console.log("/api/youtubes/unvalidated called");
		tubesRef.orderByChild("validated").equalTo(false).on("child_added", function(snapshot) {
		  console.log(snapshot.key);
		});
	});

	app.delete('/api/youtube/:youtube_id', function(req, res) {
		tubesRef.child(req.params.youtube_id).remove();
		tubesRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	tubesRef.on("child_added", function(snapshot, prevChildKey) {
	  	var tube = snapshot.val();
	  	var youtube = new Youtube(snapshot.val(), snapshot.key);
	  	youtubes.push(youtube);
	});

	tubesRef.on("child_changed", function(snapshot) {
	  	Youtube.update(youtubes,snapshot);
	  	console.log("The updated youtube key is " + snapshot.key);
	});

	tubesRef.on("child_removed", function(snapshot) {
	  console.log("The youtube with key '" + snapshot.key + "' has been deleted");
	  Youtube.delete(youtubes, snapshot);
	})

	app.get('/api/poll/youtubes', function(req, res) {
		res.send(youtubes);
	});
};