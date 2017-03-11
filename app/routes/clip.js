
// routes ======================================================================

var Clip = require('../../models/clip.js');
var clips = [];

module.exports = function(app, clipsRef) {

	//CLIPS
	app.get('/api/clips', function(req, res) {
		/* clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		}); */
		res.send(clips);
	});

	app.post('/api/clip', function(req, res) {

		console.log("create clip: ",req.body);
		var tagObject = {};
		req.body.tags.forEach(function(element) {
			tagObject[element] = true;
		});

	 	var newPostRef = clipsRef.push();
		newPostRef.set({
			minAge: req.body.minAge,
			maxAge: req.body.maxAge,
			originalTitle: req.body.originalTitle,
			violence: req.body.violence,
			ads: req.body.ads,
			youtubeId: req.body.youtubeId,
			tags: tagObject,
			time: req.body.time,
			language: req.body.language
		});

		/*clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});*/
		res.send(clips);
		
	});

	app.delete('/api/clip/:clip_id', function(req, res) {
		clipsRef.child(req.params.clip_id).remove();
		/*clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});*/
		res.send(clips);
	});

	clipsRef.on("child_added", function(snapshot, prevChildKey) {
	  	clips.push(new Clip(snapshot.val(), snapshot.key));
	});

	clipsRef.on("child_changed", function(snapshot) {
	  	Clip.update(clips,snapshot);
	  	console.log("The updated clip key is " + snapshot.key);
	});

	clipsRef.on("child_removed", function(snapshot) {
	  Clip.delete(clips, snapshot);
	  console.log("The removed clip key is " + snapshot.key);
	})

	app.get('/api/poll/clips', function(req, res) {
		res.send(clips);
	});

};