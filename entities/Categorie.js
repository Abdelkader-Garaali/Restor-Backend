var db = require('../config');



var Categorie = {

    getCategorie: function(callback)
    {
        return db.query('SELECT * from categorie', callback);
    },
   

    addCategorie: function(Categorie ,callback){
        var sql = "INSERT INTO `categorie` ( `nomCategorie`) VALUES ( '" + Categorie.nomCategorie + "')";
        return db.query(sql, callback);
    },

    updateCategorie: function(Categorie ,callback) {
        var sql = "update categorie set  nomCategorie = '" + Categorie.nomCategorie+ " ' where idCategorie=" + Categorie.id + " ;";
        return  db.query(sql,callback); 
    },

    deleteCategorie: function(Categorie ,callback) {
        return db.query("delete FROM `categorie` WHERE idCategorie =" + Categorie.id, callback);
    },
    getCAtegorieById : function(Categorie,callback){
          return db.query("SELECT * FROM `categorie` WHERE idCategorie = "+ Categorie.id,callback);
    }
    
    
  
}

module.exports = Categorie;