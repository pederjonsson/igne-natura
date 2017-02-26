// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app, clipsRef, tagsRef, tubesRef) {

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

	 	var newPostRef = clipsRef.push();
		newPostRef.set({
		  minimumAge: req.body.minage,
		  violence: req.body.violence,
		  url: req.body.url
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

	//YOUTUBES
	app.post('/api/youtube', function(req, res) {
	 	var newPostRef = tubesRef.push();
		newPostRef.set({
		  youtubeId: req.body.youtubeId,
		  validated: false,
		  //length:req.body.length,
		  originalTitle:req.body.originalTitle,
		  uploaded:Date.now()
		});
		tubesRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
	});

	app.get('/api/youtubes', function(req, res) {
		tubesRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	app.delete('/api/youtube/:youtube_id', function(req, res) {
		tubesRef.child(req.params.youtube_id).remove();
		tubesRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});
};