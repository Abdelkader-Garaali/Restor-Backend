var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Panier = require('./panier');
router.get('/getPaneUser/:id', function (req, res) {
    Panier.getPane(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getPanierUser/:id', function (req, res) {
    Panier.getUserPanier(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/addPanier', function (req, res) {
    console.log(req.body);
    Panier.addProductPanier(req.body,function(err,rows){
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }else{
        console.log("Produit vous ajouter");
        finalresult = {'msg': 'Produit ajouté au panier avec success', 'status': true,rows};
        res.json(finalresult);
    }
    
}) 
});
router.put('/updatePanier', function (req, res) {
    Panier.updatePanier(req.body,function(err,rows){
       var finalresult = [];
            if (err) {
                finalresult = {'msg': err, 'status': false};
                res.status(400).json(finalresult);
            }
            else
            {
                Panier.getPanierItem(req.body,function(err,rows2){
                   console.log("1 record updated");
                   finalresult = {'msg': 'Panier updated', 'status': true,'data':rows2};
                   res.json(finalresult);});
                }
    });
});
router.delete('/deletePanier/:id', function (req, res) {
    Panier.deletePanier(req.params,function(err,rows){

        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            finalresult = {'msg': 'Product deleted', 'status': true, 'data':rows};
       
            res.json(finalresult);
        }
    });
});

module.exports = router;
