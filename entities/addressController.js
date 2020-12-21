var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Produit = require('./address');
router.get('/getAddress', function (req, res) {
    Produit.getAddress(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/addAddress', function (req, res) {
    Produit.addAddress(req.body,function(err,rows){
        var finalresult = [];
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            finalresult = {'msg': 'Adress vous ajouter', 'status': true,rows};
            res.json(finalresult);
        }
    });
});
router.delete('/deleteAddress/:id', function (req, res) {
    Produit.deleteAddress(req.params,function(err,rows){
        var finalresult = [];
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(err);
        }
        else
        {
            finalresult = {'msg': 'address deleted', 'status': true, 'data':rows};
            res.json(finalresult);
        }
    });
});
router.put('/updateAddress', function (req, res) {
    Produit.updateAddress(req.body,function(err,rows){
        var finalresult = [];
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
               finalresult = {'msg': 'address updated', 'status': true, rows};
               res.json(finalresult);
        }
    });
});
module.exports = router;