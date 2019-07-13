const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Flickr = require("flickrapi");


//Define the express configuration
module.exports = function() {

    //Create a new express instance
    var app = express();

    //configure body parser
    app.set('json spaces',4);

    //Here we are configuring express to use body-parser as middle-ware.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join('./', 'build')));


    //add access control response
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    var flickrOptions = {
        api_key: "396a0d81bf638603a8c0adb4fe979068",
        secret: "6e8eed3f55d6c62c"
    };
    var flickrAPIObject;
    
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        flickrAPIObject = flickr;

        // Load the routing files
        require('./routes')(app, path, flickrAPIObject);
        // we can now use "flickr" as our API object,
        // but we can only call public methods and access public data
      });

    return app;
};