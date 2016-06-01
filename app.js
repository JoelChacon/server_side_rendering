// combining all the dependencies needed
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// setting up templates and creating the necessary 
//application settings so that the templates will 
//render properly
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//here is the connection to the mongodb database
MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){

        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});

// ////using Express/server side rendering
// var express = require('express'),
//     app = express(),
//     engines = require('consolidate');

// //middleware
// app.engine('html', engines.nunjucks);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');

// //routes
// app.get('/', function(req, res){
//     res.render('template', { "name": "Joel Chacon"});
// });

// app.use(function(req, res){
//     res.sendStatus(404); 
// });

// var server = app.listen(3000, function() {
//     var port = server.address().port;
//     console.log('Express server listening on port %s', port);
// });



/// how mongo gets data from the database with nodejs driver
// var MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');

// var url = 'mongodb://localhost:27017/legend';

// MongoClient.connect(url, function(err, db) {

//     assert.equal(null, err);
//     console.log("Successfully connected to server");

//     // Find some documents in our collection
//     db.collection('books').find({}).toArray(function(err, docs) {

//         // Print the documents returned
//         docs.forEach(function(doc) {
//             console.log(doc['title']);
//         });

//         // Close the DB
//         db.close();
//     });

//     // Declare success
//     console.log("Called find()");
// });