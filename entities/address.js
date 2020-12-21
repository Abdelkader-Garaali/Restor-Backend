var db = require('../config');
var Address = {

    getAddress: function(callback)
    {
        return db.query('SELECT * from address', callback);
    },
    addAddress: function(address,callback)
    {
    return db.query("INSERT INTO address (ville,zip,zone,user_idUser) " +
    "VALUES ('" + address.ville + "','"+ address.zip +"','"+ address.zone +"','"+address.user_idUser+ "')",callback);
    },
   deleteAddress : function(address, callback){
       return db.query("delete FROM `address` WHERE idAddress =" + address.id, callback);
    },

    updateAddress : function(address, callback){

        var sql = "update address set  ville = '" + address.ville + "', zip = '" + address.zip + "', zone = '" + address.zone +"'  where idAddress =" + address.idAddress + " ;";
       return db.query(sql, callback); 
    }

}
module.exports = Address;