var express = require('express')
var app = express()
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

/* models */
Clip = require("./models/clip.js")

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for us
app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

var admin = require("firebase-admin");

var serviceAccount = require("/Users/pederjonsson/Library/webb/igne-natura/igne-natura-firebase-adminsdk-kluso-c11ad60b78.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://igne-natura.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("clips");

var clipUrls = [];
var count = 0;

ref.on("child_added", function(snap) {
  count++;
  console.log("added:", snap.key);
  var clip = new Clip(snap.val());
	  console.log("clip: " + clip.data.url);
	  clipUrls.push(clip.data.url);
});

// length will always equal count, since snap.val() will include every child_added event
// triggered before this point
ref.once("value", function(snap) {
  console.log("initial data loaded!", snap.numChildren() === count);
});

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos

app.get('/', function (req, res) {
	res.send("<h1>start page</h1>")
})

app.get('/api/clips', function(req, res) {
	console.log("api clips here");

	ref.once("value", function(snapshot) {
	  console.log(snapshot.val());
	  res.send(snapshot.val());
	});
});

app.get('/api/clips/url', function(req, res) {
	console.log("api clip urls here");
	
	  res.send(clipUrls);
	
});

app.post('api/clip', function(req, res) {

	res.send("posted clip data: " + req.body.text);
	/*ref.once("value", function(snapshot) {
	  console.log(snapshot.val());
	  res.send(snapshot.val())
	});*/
});

app.delete('api/clip/:clip_id', function(req, res) {

	res.send("deleted clip id: " + req.params.clip_id);
	/*ref.once("value", function(snapshot) {
	  console.log(snapshot.val());
	  res.send(snapshot.val())
	});*/
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

