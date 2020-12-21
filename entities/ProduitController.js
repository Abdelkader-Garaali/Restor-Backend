var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Produit = require('./Produit');
router.get('/getProducts', function (req, res) {
    Produit.getProduct(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/addProduct', function (req, res) {
    Produit.addProduct(req.body,function(err,rows){
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }else{
        console.log("Produit vous ajouter");
        finalresult = {'msg': 'Produit vous ajouter', 'status': true,rows};
        res.json(finalresult);
    }
    
}) 
});
router.delete('/deleteProduct/:id', function (req, res) {
    Produit.deleteProduct(req.params,function(err,rows){

        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            finalresult = {'msg': 'produit deleted', 'status': true, 'data':rows};
       
            res.json(finalresult);
        }
    });
});

router.put('/updateProduct', function (req, res) {
    Produit.updateProduct(req.body,function(err,rows){
       var finalresult = [];
            if (err) {
                finalresult = {'msg': err, 'status': false};
                res.status(400).json(finalresult);
            }
            else
            {
                   console.log("1 record updated");
                   finalresult = {'msg': 'Product updated', 'status': true,rows};
                   res.json(finalresult);
                }
    });
});
router.get('/getProduitRestau/:id', function (req, res) {
    Produit.getProduitRestau(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getProduitResto/:id', function (req, res) {
    Produit.getProduitResto(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getRestProd/:id/:cat', function (req, res) {

    Produit.getRestProd(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getRestByProd/:id', function (req, res) {

    Produit.getRestByProd(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getProduitcat', function (req, res) {
    Produit.getProduitcat(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getProd/:id', function (req, res) {
    Produit.getProd(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
module.exports = router;