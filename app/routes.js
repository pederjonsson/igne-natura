// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app, clipsRef, tagsRef, tubesRef) {

	app.get('/', function(req, res) {
		console.log("loaded index page");
	    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	app.get('/api/clips', function(req, res) {
		console.log("api clips here");

		clipsRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  console.log("snapshot.val() = " + snapshot.val());
		  console.log("snapshot = " + snapshot);
		  res.json(snapshot.val());
		});
	});


//var clipUrls = [];
//var count = 0;

/*ref.on("child_added", function(snap) {
  count++;
  console.log("added:", snap.key);
  var clip = new Clip(snap.val());
	  console.log("clip: " + clip.data.url);
	  clipUrls.push(clip.data.url);
});*/

// length will always equal count, since snap.val() will include every child_added event
// triggered before this point
/*ref.once("value", function(snap) {
  console.log("initial data loaded!", snap.numChildren() === count);
});*/

	app.post('/api/clip', function(req, res) {
	 	console.log('req.body.minage: ' + req.body.minage);
	 	console.log('req.body.violence: ' + req.body.violence);
	 	console.log('req.body.url: ' + req.body.url);

	 	var newPostRef = clipsRef.push();
		newPostRef.set({
		  minimumAge: req.body.minage,
		  violence: req.body.violence,
		  url: req.body.url
		});
		// Get the unique key generated by push()
		var postId = newPostRef.key;
		console.log(postId);

		clipsRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});

	   // res.end();
	});

	app.get('/api/clips', function(req, res) {
		console.log("fetching clips");

		clipsRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	app.delete('/api/clip/:clip_id', function(req, res) {
		console.log("delete clip id: " + req.params.clip_id);
		clipsRef.child(req.params.clip_id).remove();

		clipsRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
	});


	//TAGS
	app.post('/api/tag', function(req, res) {
	 	console.log('tagname: req.body.name: ' + req.body.name);

	 	var newPostRef = tagsRef.push();
		newPostRef.set({
		  name: req.body.name
		});
		// Get the unique key generated by push()
		var postId = newPostRef.key;
		console.log("tagid just created: " + postId);

		tagsRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
	});

	app.get('/api/tags', function(req, res) {
		console.log("fetching tags");

		tagsRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	app.delete('/api/tag/:tag_id', function(req, res) {
		console.log("delete tag id: " + req.params.tag_id);
		tagsRef.child(req.params.tag_id).remove();

		tagsRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	//YOUTUBES
	app.post('/api/youtube', function(req, res) {
	 	console.log('youtubeId: req.body.name: ' + req.body.youtubeId);

	 	var newPostRef = tubesRef.push();
		newPostRef.set({
		  youtubeId: req.body.youtubeId,
		  validated: false,
		  length:req.body.length,
		  originalTitle:req.body.originalTitle,
		  uploaded:Date.now()
		});
		// Get the unique key generated by push()
		var postId = newPostRef.key;
		console.log("youtubeid just created: " + postId);

		tubesRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
	});

	app.get('/api/youtubes', function(req, res) {
		console.log("fetching youtubes");

		tubesRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});

	app.delete('/api/youtube/:youtube_id', function(req, res) {
		console.log("delete youtube id: " + req.params.youtube_id);
		tubesRef.child(req.params.youtube_id).remove();

		tubesRef.once("value", function(snapshot) {
		  res.json(snapshot.val());
		});
	});
};