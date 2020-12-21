var db = require('../config');


var CommandeProduit ={

    getCommandeProduit : function(callback)
    {
        return db.query('select * from `commande_produit`',callback )
    },

    addCommandeProduit : function(commande ,callback)
    {
        return db.query("INSERT INTO `commande_produit` ( `Commandes_idCommande`,`produits_idProduit`,`quantite`) VALUES ( '" + commande.Commandes_idCommande + "','" + commande.produits_idProduit + "','" + commande.quantite + "')",callback);
     
    },
    getComProdBYId: function(commande,callback)
{
    return db.query( "SELECT * FROM `commande_produit` WHERE idCommande = "+ commande.inse,callback);
}

}
module.exports = CommandeProduit;
