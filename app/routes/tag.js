
var Tag = require('../../models/tag.js');
var tags = [];

// tag routes ======================================================================
module.exports = function(app, tagsRef) {

	app.post('/api/tag', function(req, res) {
	 	var newPostRef = tagsRef.push();
		newPostRef.set({
		  	name: req.body.name
		});
		res.send(tags);
	});

	app.get('/api/tags', function(req, res) {
		tagsRef.once("value", function(snapshot) {
		  	res.json(snapshot.val());
		});
	});

	app.delete('/api/tag/:tag_id', function(req, res) {
		tagsRef.child(req.params.tag_id).remove();
		res.send(tags);
	});

	tagsRef.on("child_added", function(snapshot, prevChildKey) {
	  	tags.push(new Tag(snapshot.val(), snapshot.key));
	});

	tagsRef.on("child_changed", function(snapshot) {
	  	Tag.update(tags,snapshot);
	  	console.log("The updated tag key is " + snapshot.key);
	});

	tagsRef.on("child_removed", function(snapshot) {
	  Tag.delete(tags, snapshot);
	  console.log("The removed tag key is " + snapshot.key);
	})

	app.get('/api/poll/tags', function(req, res) {
		res.send(tags);
	});
};