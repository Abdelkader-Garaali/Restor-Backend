var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var commande = require('./commande');


router.get('/getCommande', function (req, res) {
    commande.getCommande(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getCommandeByUser/:id', function (req, res) {
    commande.getCommandeByUser(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
router.get('/getuserCom/:id', function (req, res) {
    commande.getuserCom(req.params,function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/addCommande', function (req, res) {
    commande.addCommande(req.body,function(err,rows){
       if(err) {
        finalresult = {'msg': err, 'status': false};
        res.status(400).json(err);
    }
    else
    {
        commande.getCommandeById(rows,function(err2,rows2){
            if(err2){
                finalresult = {'msg': err, 'status': false};
                res.status(400).json(err);
            }
            else{
                finalresult = {'msg': 'Commande added', 'status': true, 'data':rows,rows2};
                res.json(finalresult);
            }
           
        });
       
    }
    });
});

router.put('/putCommande', function (req, res) {
    commande.putCommande(req.body,function(err,rows){
       
        if(err) {
            res.status(400).json('msg'+ err, 'status'+ false);
        }
        else
        {
            rows.insertId=req.body.idCommande;
        
            commande.getCommandeById(rows,function(err2,rows2){
                if(err2){
                    res.status(400).json('msg'+ err2, 'status'+ false);
                }
                else{
                    finalresult = {'msg': 'Commande updated', 'status': true, 'data':rows,rows2};
                    res.json(finalresult);
                }

            })
           
        }
    });
});

router.delete('/deleteCommande/:id', function (req, res) {
    commande.deleteCommande(req.params,function(err,rows){
         if(err) {
             res.status(400).json('msg'+ err, 'status'+ false);
         }
         else
         {
             res.json('cammande deleted');
         }
     });
 }) 
 
 
 module.exports = router;