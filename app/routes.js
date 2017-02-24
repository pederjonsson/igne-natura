// routes ======================================================================

// expose the routes to our app with module.exports
module.exports = function(app, clipsRef) {

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

	app.get('api/clip', function(req, res) {
	 	console.log('Processing get request...');
	    res.send("jippi");
	});

	app.delete('api/clip/:clip_id', function(req, res) {

		console.log("delete attempt 3");
		console.log("deleteid. " + req.params.clip_id);
		

		clipsRef.child(req.params.clip_id).remove();

		clipsRef.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.json(snapshot.val());
		});
		//res.end(); //send("deleted clip id: " + req.params.clip_id);
		/*ref.once("value", function(snapshot) {
		  console.log(snapshot.val());
		  res.send(snapshot.val())
		});*/
	});
};