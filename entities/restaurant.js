var db = require('../config');
var bcrypt = require('bcrypt');


var Restaurant = {
    getRestaurant: function(callback)
    {
        return db.query('SELECT * from restaurant   JOIN user ON  restaurant.partenaire_idUser = user.idUser ', callback);
    },
    f_restaurant: function(resto, callback){
    var sql = "INSERT INTO `restaurant`(`facebookPage`, `nameResto`, `specialite`, `webSite`, `partenaire_idUser`, `ouverture`, `fermeture`, `latitude`, `longitude`, `image`, `address`) VALUES('"
    +resto.facebookPage + "','"+resto.nameResto +"','"+ resto.specialite +"','"+resto.webSite+"','"+resto.partenaire_idUser+"','"+resto.Open+"','"+resto.Close+"','"+resto.latitude+"','"+resto.longitude+"','"+resto.image+"','"+resto.address+"');";
    console.log(sql);
      return  db.query(sql,callback);
    },
    deleteRestaurant : function(Restaurant, callback){
       return db.query("delete FROM `restaurant` WHERE idResto =" + Restaurant.id, callback);
    },
    deleteCAtByResto:function(Restaurant,callback){
      return  db.query("delete FROM `restaurant_categorie` WHERE restaurants_idResto =" + Restaurant.id, callback);
    },
    updateRestaurant : function(Restaurant, callback){
        var sql = "update restaurant set  facebookPage = '" + Restaurant.facebookPage + "', nameResto = '" + Restaurant.nameResto + "', specialite = '" + Restaurant.specialite + "', webSite ='"+ Restaurant.webSite+"', partenaire_idUser = '"+Restaurant.partenaire_idUser+"'  where idResto =" + Restaurant.idResto + " ;";
        return db.query(sql, callback) ;
    },
    getRestoLike: function(resto ,callback)
    {
        return db.query('SELECT * from restaurant WHERE nameResto like "%'+resto.nom+'%"', callback);
    }
}

module.exports = Restaurant;