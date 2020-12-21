var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');


router.use(bodyParser.json());
var restaurant = require('./restaurant');
router.get('/getRestaurants', function (req, res) {
    restaurant.getRestaurant(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/addRestaurants', function (req, res) {
    restaurant.f_restaurant(req.body,function(err,rows){
        console.log(req.body.facebookPage);
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
            console.log(err);

        }
        else
        {
            finalresult = {'msg': 'Restaurant ajouté', 'status': true, rows};
            res.json(finalresult);
        }
    });
});
router.delete('/deleteRestaurant/:id', function (req, res) {
    console.log(req.params);
    restaurant.deleteCAtByResto(req.params,function(err1,rows1){
        if(err1) {
            finalresult = {'msg': err, 'status': fasle};
            res.status(400).json(finalresult);
            console.log(err1);
        }
        else
        { console.log(rows1);
            finalresult = {'msg': 'categories deleted', 'status': true, 'data':rows1};
            console.log(finalresult);
            restaurant.deleteRestaurant(req.params,function(err,rows){
                if(err) {
                    finalresult = {'msg': err, 'status': fasle};
                    res.status(400).json(finalresult);
                    console.log(err);


                }
                else
                {
                    finalresult = {'msg': 'Restaurant deleted', 'status': true, 'data':rows};
                    console.log(rows);

                    res.json(finalresult);
                }
            });
        }
    })
    
});

router.put('/updateRestaurant', function (req, res) {
    restaurant.updateRestaurant(req.body,function(err,rows){
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            finalresult = {'msg': 'Restaurant updated', 'status': true, rows};
            res.json(finalresult);
        }
    });
});
router.get('/getRestoLike/:nom', function (req, res) {
    restaurant.getRestoLike(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/UploadImage', function(req, res) {
    var fileName = "" ;
    console.log(req.body);
    var upload = multer({ dest: 'Ressources/imagesresto/'}).single('file')
    upload(req, res, function(err) {
        console.log(req.body.filename)
        if (err) {
            console.log("Error uploading file: " + err)
            return
        }
        fs.rename('./Ressources/imagesresto/' + req.file["name"], './Ressources/imagesresto/' + req.body.filename, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
        fileName += req.file["name"] ;
        res.json(req.body.filename);
    })
});
module.exports = router;