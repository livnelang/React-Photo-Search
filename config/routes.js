// Define users routes module
module.exports = function(app, path, flickrAPIObject) {
    // C.R.U.D operations
    app.get('/*', fetchIndex);
    app.post('/searchPhotos', searchPhotos);



    function fetchIndex(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }


    function searchPhotos(req, res) {
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
    }

};