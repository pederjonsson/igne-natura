
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
		console.log("child_added youtube");
	  	var tube = snapshot.val();
	  	var youtube = new Youtube(snapshot.val(), snapshot.key);
	  	youtubes.push(youtube);
	});

	app.get('/api/poll/youtubes', function(req, res) {
		res.send(youtubes);
	});
};