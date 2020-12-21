var db = require('../config');


var Commande ={

    getCommande : function(callback)
    {
        return db.query('select * from commande',callback )
    },

    addCommande : function(commande ,callback)
    {
        var sql = "INSERT INTO `commande` ( `addressCommande`,`dateCommande`,`prixCommande`,`id_User`,`type`) VALUES ( '" + commande.addressCommande + "','" + commande.dateCommande + "','" + commande.prixCommande+ "','" + commande.id_User+ "','" + commande.type  +"')";
        return db.query(sql,callback);
    },


    putCommande : function(commande ,callback)
    {
        var sql = "update  `commande` set `addressCommande`= '" + commande.addressCommande + "',`dateCommande`='" + commande.dateCommande + "',`prixCommande`='" + commande.prixCommande + "' where idCommande='" + commande.idCommande + "' ;";

     return   db.query(sql,callback);
        
    },


    deleteCommande : function(commande ,callback) {
        
       return db.query("delete FROM `commande` WHERE idCommande =" + commande.id,callback);
    },
    getCommandeById : function(commande ,callback) {
        return db.query("SELECT * FROM `commande` WHERE idCommande = "+ commande.insertId,callback);
    },
    getCommandeByUser : function(commande , callback){
        return db.query('select * from ((commande_produit  JOIN commande on commande_produit.Commandes_idCommande = commande.idCommande)  JOIN produit ON produit.idProduit = commande_produit.produits_idProduit ) INNER JOIN restaurant ON restaurant.idResto = produit.idRestaurant where id_User = '+commande.id, callback);
    },
    getuserCom : function(commande,callback){
        return db.query('select *from commande where id_User ='+ commande.id,callback);
    }
}
module.exports = Commande;
