
// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app, clipsRef, tagsRef) {

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

	//TAGS
	app.post('/api/tag', function(req, res) {
	 	var newPostRef = tagsRef.push();
		newPostRef.set({
		  	name: req.body.name
		});
		tagsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.get('/api/tags', function(req, res) {
		tagsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.delete('/api/tag/:tag_id', function(req, res) {
		tagsRef.child(req.params.tag_id).remove();

		tagsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

};