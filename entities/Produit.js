var db = require('../config');
var Produit = {
    getProduct: function(callback)
    {
        return db.query('SELECT * from produit', callback);
    },
    addProduct: function(Produit,callback)
    {
        return db.query("INSERT INTO produit (descriptionProduit,nomProduit,photoProduit,prixProduit,categorie_idCategorie,idRestaurant) " +
        "VALUES ('" + Produit.descriptionProduit + "','"+ Produit.nomProduit +"','"+ Produit.photoProduit +"','"+Produit.prixProduit+"','"+Produit.categorie_idCategorie+"','"+Produit.idRestaurant+ "')", callback);
    },
    deleteProduct : function(Produit, callback){
       return db.query("delete FROM `produit` WHERE idProduit =" + Produit.id,callback);
    },
    updateProduct : function(Produit, callback){
        return db.query("update produit set  descriptionProduit = '" + Produit.descriptionProduit + "', nomProduit = '" + Produit.nomProduit + "', photoProduit = '" + Produit.photoProduit + "', prixProduit ='"+ Produit.prixProduit+"', categorie_idCategorie = '"+Produit.categorie_idCategorie+"'  where idProduit =" + Produit.idProduit + " ;", callback);
    },
    getProduitRestau: function(Produit,callback)
    {
    return db.query('SELECT *  FROM categorie RIGHT JOIN produit ON categorie.idCategorie = produit.categorie_idCategorie where produit.idRestaurant='+Produit.id, callback);
    },
    getProduitResto: function(produit,callback)
    {
    return db.query('SELECT DISTINCT * FROM produit RIGHT JOIN categorie ON categorie.idCategorie = produit.categorie_idCategorie  where produit.idRestaurant='+produit.id, callback);
    },
    getRestProd: function(produit,callback)
    {
    return db.query('SELECT * from produit  JOIN categorie  on  categorie.idCategorie='+produit.cat+ ' AND  categorie.idCategorie= produit.categorie_idCategorie AND  produit.idRestaurant='+produit.id, callback ); 
    },
    getRestByProd: function(produit,callback)
    {
    return db.query('SELECT * from produit  JOIN restaurant  on  produit.idProduit='+produit.id+ ' AND  restaurant.idResto= produit.idRestaurant', callback ); 
    },
    getProduitcat: function(callback)
    {
    return db.query('SELECT * FROM produit RIGHT JOIN categorie ON categorie.idCategorie = produit.categorie_idCategorie  ', callback);
    },
    getProd: function(produit,callback)
    {
    return db.query('SELECT  * FROM produit where idProduit='+produit.id, callback);
    }
}
module.exports = Produit;