var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var commandeP = require('./commande_produit');

router.post('/addCommandeProduit', function (req, res) {
    commandeP.addCommandeProduit(req.body,function(err,rows){
       if(err) {
        finalresult = {'msg': err, 'status': false};
        res.status(400).json(err);
    }
    else
    {
                finalresult = {'msg': 'Commande added', 'status': true, 'data':rows};
                console.log(rows);
                res.json(finalresult);
       
    }
    });
});
module.exports = router;