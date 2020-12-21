var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./Categorie');


router.get('/getCategorie', function (req, res) {
    User.getCategorie(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/addCategorie', function (req, res) {
    User.addCategorie(req.body,function(err,rows){
        if(err) {
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
            res.json({msg: 'This is CORS-enabled for all origins!'})
        }
        else
        {
            finalresult = {'msg': "Categorie added ", 'status': true,rows};
            res.json(rows);
        }
    });
});

router.put('/updateCategorie', function (req, res) {
    User.updateCategorie(req.body,function(err,rows){
        if(err) {
            
            finalresult = {'msg': err, 'status': false};
            res.status(400).json(finalresult);
        }
        else
        {
            User.getCAtegorieById(req.body,function(er2,rse2){
                if(er2)
                {
                    finalresult = {'msg': er2, 'status': false};
                      res.status(400).json(finalresult);
                }else{
                    finalresult = {'msg': "categorie updated", 'status': true,rse2}; 
                    res.json(finalresult);

                }
            });
          
        }
    });
});

router.delete('/deleteCategorie/:id', function (req, res) {
   // console.log("--------------------------------",req.params.id)
   User.deleteCategorie(req.params,function(err,rows){
    if(err) {
        finalresult = {'msg': err, 'status': false};
        res.status(400).json(err);
    }
    else
    {
        finalresult = {'msg': 'categorie deleted', 'status': true, 'data':rows};
        res.json(finalresult);
    }
    });
}) 


module.exports = router;