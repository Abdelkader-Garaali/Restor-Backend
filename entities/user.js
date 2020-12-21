var db = require('../config');



var User = {
    getUsers: function(callback)
    {
        return db.query('SELECT * from user', callback);
    },
    loginUsers: function(User, callback){
        
     
         sql= "SELECT * FROM `user` WHERE username = '" + User.username + "' OR email = '"+User.email+"';";
            console.log(sql)
         return    db.query(sql, callback);


    },
    getUserByemail :function(User,callback){
        sql="SELECT email FROM `user` where email='" + User.email + "';";
        return db.query(sql, callback);
    },
    getUserByUserName :function(User,callback){
        sql="SELECT username FROM `user` where username='" + User.username + "';";
        return db.query(sql, callback);
    },

    registerUser : function(User, callback){
                 var sql = "INSERT INTO user (email,username,fName,lName,num_tel,password,photo,role,age,disponibilite,situationActuelle,vehicule,zone,dateRDV) VALUES ('" + User.email + "','"+ User.username + "','"  + User.fName + "','" + User.lName+ "','" + User.num_tel + "','" + User.password + "','"+User.photo+"','"+User.role+"','"+User.age+"','"+User.disponibilite+"','"+User.situationActuelle+"','"+User.vehicule+"','"+User.zone+"','"+User.dateRDV+"')";
                 return db.query(sql, callback);
              
            },
    getUserbyId : function(User, callback){
        console.log(User.insertId);
                var sql = "SELECT * FROM `user` WHERE idUser =" + User.id;
                return db.query(sql, callback);
             
 }   ,
 updateUser:function(User,callback){
    var sql = "update user set  username = '" + User.username + "', email = '" + User.email + "', role ='"+ User.role+"', photo = '"+User.photo+"', num_tel = '"+User.num_tel+"',fName = '"+User.fName+"',lName = '"+User.lName+" ' where idUser =" + User.id + " ;";

      return db.query(sql, callback);
 }
}

module.exports = User;