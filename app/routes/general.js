
// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app, clipsRef) {

	app.get('/', function(req, res) {
	    res.sendfile('./public/index.html'); // load index
	});

	//CLIPS
	app.get('/api/clips', function(req, res) {
		clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.post('/api/clip', function(req, res) {

		console.log("req.body",req.body);
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

		clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
		
	});

	app.delete('/api/clip/:clip_id', function(req, res) {
		clipsRef.child(req.params.clip_id).remove();
		clipsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

};