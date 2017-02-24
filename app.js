var express = require('express');
var app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for us
app.use(morgan('dev'));                                         // log every request to the console
 //   app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());

var admin = require("firebase-admin");

//var serviceAccount = require("/Users/pederjonsson/Library/webb/igne-natura/igne-natura-firebase-adminsdk-kluso-c11ad60b78.json");
var serviceAccount = require("/Users/pederjonsson/web/igne-natura/igne-natura-firebase-adminsdk-kluso-c11ad60b78.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://igne-natura.firebaseio.com/"
});

var db = admin.database();
var clipsRef = db.ref("clips");

// load the routes
require('./app/routes')(app, clipsRef);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

