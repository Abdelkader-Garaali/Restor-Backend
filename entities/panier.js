var db = require('../config');
var Panier ={
    getUserPanier: function(panier,callback)
    {console.log('SELECT * from ((panier  INNER JOIN produit on produit.idProduit = panier.id_produit) INNER JOIN categorie ON produit.categorie_idCategorie = categorie.idCategorie ) INNER JOIN restaurant ON restaurant.idResto = produit.idProduit where id_user = '+panier.id);

        return db.query('SELECT * from ((panier  INNER JOIN produit on produit.idProduit = panier.id_produit) INNER JOIN categorie ON produit.categorie_idCategorie = categorie.idCategorie ) INNER JOIN restaurant ON restaurant.idResto = produit.idRestaurant where id_user = '+panier.id, callback);
    },
    addProductPanier:function(panier ,callback){
        return db.query("INSERT INTO panier (id_user,id_produit,quantite) " +
        "VALUES ('" + panier.id_user + "','"+ panier.id_produit +"','"+ panier.quantite + "')", callback);
    },
    updatePanier: function(panier, callback){
        return db.query("update panier set  quantite = '" + panier.quantite + "'  where id_panier =" + panier.id_panier + " ;", callback);
    },
    deletePanier : function(panier, callback){
        return db.query("delete FROM `panier` WHERE id_panier =" + panier.id,callback);
     },
     getPane:function(panier,callback){
        return db.query('SELECT * from panier JOIN produit on produit.idProduit = panier.id_produit where panier.id_user = '+panier.id, callback);

     },
     getPanierItem:function(panier,callback){
        return db.query('SELECT * from ((panier  INNER JOIN produit on produit.idProduit = panier.id_produit) INNER JOIN categorie ON produit.categorie_idCategorie = categorie.idCategorie ) INNER JOIN restaurant ON restaurant.idResto = produit.idRestaurant where id_panier = '+panier.id_panier, callback);

     }

}
module.exports = Panier;