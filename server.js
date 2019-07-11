const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
var Flickr = require("flickrapi");

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
  });



// create a http module from express
var server = require('http').createServer(app);



// Set The Port
app.set('port', process.env.PORT || 5000);

app.post('/searchPhotos', function (req, res) {
  var tagsParam;

  if(req.body != undefined) {
    tagsParam = req.body.tags;
  }

    flickrAPIObject.photos.search({
        tags: tagsParam,
        extras: 'url_o',
        per_page: 20,
        page: req.body.page
      }, function(err, result) {
        
        if (result) {
          var filteredPhotos = [];
          var responsePhotos = result.photos.photo;
          

          responsePhotos.forEach(function(photo) {
            if(photo.url_o) {
              filteredPhotos.push(photo);
            }
        });

          
            res.json(filteredPhotos);
        } else {
          res.json(err);
        }
      });

})


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
server.listen(app.get('port'), function() {
    console.log('Express server listening on port '+ server.address().port +' ..');
});