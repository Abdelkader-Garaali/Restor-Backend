var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var RestaurantCat = require('./restaurant-cat');
router.get('/getRestCats', function (req, res) {
    RestaurantCat.getRestCat(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/addRestCats', function (req, res) {
    RestaurantCat.addRestCat(req.body,function(err,rows){
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            finalresult = {'msg': 'categorie ajouter pour votre restaurant ', 'status': true};
            res.json(finalresult);
        }
    });
});

router.get('/getrestoCat/:id', function (req, res) {
    RestaurantCat.getCatResto(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.delete('/deleterestcat/:idrest/:idcat',function(req,res){
    RestaurantCat.deleteCatResto(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
})

module.exports = router;