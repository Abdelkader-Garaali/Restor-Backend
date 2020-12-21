var db = require('../config');
var RestaurantCat = {
    getRestCat: function(callback)
    {
        return db.query('SELECT * from restaurant_categorie', callback);
    },
    addRestCat: function(restCat,callback)
    {
    var sql = "INSERT INTO restaurant_categorie (restaurants_idResto,categories_idCategorie) " +
    "VALUES ('" + restCat.restaurants_idResto + "','"+ restCat.categories_idCategorie +"')";
        return db.query(sql, callback);
    },
    getCatResto: function(restCat,callback)
    {
    return db.query('SELECT *  FROM categorie RIGHT JOIN restaurant_categorie ON restaurant_categorie.categories_idCategorie = categorie.idCategorie where restaurant_categorie.restaurants_idResto='+restCat.id, callback);
    },
    deleteCatResto:function(restCat,callback){
        return db.query("delete from restaurant_categorie where categories_idCategorie= "+restCat.idcat+" and restaurants_idResto= "+restCat.idrest,callback);
    }
}
module.exports = RestaurantCat;