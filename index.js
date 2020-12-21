const mysql = require('mysql');
const express = require('express');
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var aesjs = require('aes-js')
var multer = require('multer')
var fs = require('fs');
const app = express()
const saltRounds = 5;

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
   database: 'restaurant'
    //, port: 3306
  });
 app.use(express.json())
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json())
 //connection.connect();
 app.get('/',(req, res) => {
     res.send('Hello World!!!')
 })

 app.get('/api/courses',(req, res) => {
     res.send([1,2,3])
 })

 app.get('/api/posts/:year/:month',(req, res)=>{
     res.send(req.query)
 })
 //PORT
const port = process.env.PORT || 3001
 app.listen(port, () => console.log('Listening on port ',port,'...'))

  connection.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
  });

 
  app.post('/login', function (req, res) {
    var service = req.body;
    console.log("service: ",service)
    var sql = "SELECT * FROM `users` WHERE username = '" + service.username + "' OR email = '"+service.email+"';"
    console.log(sql)
    connection.query(sql, function (error, results) {
       /* let data = service.password // encoded data
        console.log("dataPassword1: ",data)
            let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used
            console.log(decodedData); // output: Hello World
        bcrypt.hash(decodedData, saltRounds, function (err, bcryptedPassword) {
            console.log("bcryptedPassword1: ",bcryptedPassword);
           
        });*/
        if (results[0] != null) {
            founduser = results[0];
            var hash = results[0].password;
          /*  let encodedData = Buffer.from(hash).toString('base64')
            console.log("encodedData: ",encodedData);
            console.log("password: ",hash)*/
            let data = service.password; // encoded data
         //   let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used
            console.log("decodedData2: ",data); // output: Hello World
            bcrypt.compare(decodedData, hash, function (err, doesMatch) {
                if (doesMatch) {
                    console.log('does match');
                    console.log(founduser);
                    
                    founduser.password = data
                    finalresult = {'msg': 'Logged', 'status': true, 'data': founduser};
                    console.log(finalresult)

                    res.json(finalresult);
                    //password matchs
                } else {
                    console.log('doesn\'t match');
                    //password doesn't match
                    finalresult = {'msg': 'Check your password', 'status': false};
                    res.json(finalresult);
                }
            });
            /*let encodedData = Buffer.from(hash).toString('base64')
            console.log("encodedData: ",encodedData);
            console.log("password: ",hash)
            founduser.password = encodedData
            finalresult = {'msg': 'Logged', 'status': true, 'data': founduser};
            res.json(finalresult);*/
           
        } else {
            console.log('doesn\'t match2');
            //password doesn't match
            finalresult = {'msg': 'Check yout identified', 'status': false};
            res.json(finalresult);
        }
     /*   finalresult = results;
        console.log("result: ",finalresult)
        res.json(finalresult);*/
    });
})
app.post('/signup', function (req, res) {
    var user = req.body;
    console.log("user service: ",user)
    var finalresult = [];
    connection.query("SELECT username FROM `user` where username='" + user.username + "';", function (error, results) {
        if (results.length > 0) {
            finalresult = {'msg': 'username already used', 'status': false};
            res.json(finalresult);
        } else {
            connection.query("SELECT email FROM `user` where email='" + user.email + "';", function (error, results) {
                if (results.length > 0) {
                    finalresult = {'msg': 'email already used', 'status': false};
                    res.json(finalresult);
                }
                else
                {
                    let data = user.password; // encoded data
                //    let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used                                          
                    console.log("decodedData3: ",data); // output: Hello World
                    bcrypt.hash(data, saltRounds, function (err, bcryptedPassword) {                                                                                                                                                                                                  
                        console.log("bcryptedPassword3: ",bcryptedPassword);
                        var sql = "INSERT INTO user (email,username,fName,lName,num_tel,password,photo,role,age,disponibilite,situationActuelle,vehicule,zone,dateRDV) VALUES ('" + user.email + "','"+ user.username + "','"  + user.fName + "','" + user.lName+ "','" + user.num_tel + "','" + bcryptedPassword + "','"+user.photo+"','"+user.role+"','"+user.age+"','"+user.disponibilite+"','"+user.situationActuelle+"','"+user.vehicule+"','"+user.zone+"','"+user.dateRDV+"')";
                        
                        console.log(sql)
                        connection.query(sql, function (err, result) {
                            if (err) {
                                finalresult = {'msg': err, 'status': false};
                                res.json(finalresult)
                                throw err;
                            }
                            console.log("1 record inserted");
                            console.log(result);
                            connection.query("SELECT * FROM `user` WHERE idUser =" + result.insertId, function (error, results) {
                                founduser = results[0];
                                founduser.password = data
                                finalresult = {'msg': 'user added', 'status': true, 'insertedId' : result.insertId, 'data':founduser};
                                console.log(finalresult)
                                res.json(finalresult)
                            });
                           
                        });
                    });
                }
            })
          
        }
    });
})
 
   
app.get('/allStatus', function (req, res) {
    var cred = req.body;
    var resultList = []
    var i = 0
    connection.query("SELECT * FROM `status`", function (error, results) {
        console.log('does match');
        resultList = results
        var finalresult = []
        var finalresultuser
        console.log("resultList: ",resultList)
        if(results.length != 0)
        {
      results.forEach(function(element) {
            console.log(element);
            console.log("iiiii: ",i)
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]
                   console.log("resultListI: ",resultList[i])

                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                    console.log(resultList[i])
                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
        }
        else
        {
            res.json(results);

        }
          //res.json(finalresult);
       /* finalresult = results;
        res.json(finalresult);*/
    });
})
app.get('/getUserById/:id', function (req, res) {
    var cred = req.params;
    
            sql = "SELECT * FROM `users` WHERE USER_ID = "+ cred.id
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               // console.log('does match');

               finalresult = results[0]
               
   
             
                console.log("finalresult ",finalresult);
                res.json(finalresult);

            });
         
       // finalresult = results;
   
})
app.post('/addStatus', function (req, res) {
    var status = req.body;
    var finalresult = [];
    var sql = "INSERT INTO status (status,image,video,lai,lon,datePoste,type,dateReplay,replay_statuts,imageReplay,users_USER_ID) " +
        "VALUES ('" + status.status + "','" + status.image + "','" + status.video + "','" + status.lai + "','" + status.lon + "','" +status.datePoste+ "','"+status.type+"','"+status.dateReplay+"','"+status.replay_statuts+"','"+status.imageReplay+"','"+status.users.id+"')";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }

        connection.query("SELECT * FROM `status` WHERE STATUS_ID =" + result.insertId, function (error, results) {
            //founduser = results[0];
         results.forEach(function(element) {
            sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
             
               element.users_USER_ID = results[0]
               //finalresult.push(element)
               console.log("finalresult2 ",element);
               
               res.json(element);
           
        });
    });
    

        /* console.log("commentaire ajouter");
        finalresult = {'msg': 'commentaire ajouter', 'status': true};
        res.json(finalresult)*/
    });
}) 
}) 

app.get('/allReactionByIdSt/:id', function (req, res) {
    var cred = req.params;
    
            sql = "SELECT * FROM `conf_confp` WHERE statuss_STATUS_ID = "+ cred.id
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               // console.log('does match');
               console.log(results.length)
               if(results.length != 0)
               {

                var finalresult = []
                console.log("results: ",results)
                results.forEach(function(element) {
                 console.log("indexOf: ",results.indexOf(element) ==  results.length - 1 ,"  ",results.indexOf(element) < results.length - 1);
                 if (results.indexOf(element) < results.length - 1 )
                 {
                     sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                     console.log(sql);
         
                     connection.query(sql, function (error, results) {
                         console.log('does match');
                        element.users_USER_ID = results[0]
                        sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
                     console.log(sql);
                     connection.query(sql, function (error, results) {
                         console.log('does match');
                        element.	statuss_STATUS_ID = results[0]
                        finalresult.push(element)
                        console.log("finalresult1  ",finalresult);
 
                     });
                       
                     });
                    
                     
     
                 }
                 else if (results.indexOf(element) ==  results.length - 1 )
                 {
                     sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                     console.log(sql);
         
                     connection.query(sql, function (error, results) {
                         console.log('does match');
                        element.users_USER_ID = results[0]
                        sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
                     console.log(sql);
                             connection.query(sql, function (error, results) {
                                 console.log('does match');
                                 element.statuss_STATUS_ID = results[0]
                                 sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.statuss_STATUS_ID.users_USER_ID
                             console.log(sql);
                 
                                     connection.query(sql, function (error, results) {
                                         console.log('does match');
                                     element.statuss_STATUS_ID.users_USER_ID = results[0]
                                     
                                     finalresult.push(element)
                                     console.log("finalresult1  ",finalresult);
                                     res.json(finalresult);
                                     });
                             
 
                             });
                             
                     });
                 }
               
               });
               }
               else
               {
                console.log("resultats  ",results);
                res.json(results);
               }

              

            });
         
       // finalresult = results;
   
})

app.get('/allReactionByIdStUs/:idS/:idU', function (req, res) {
    var cred = req.params;
    
            sql = "SELECT * FROM `conf_confp` WHERE statuss_STATUS_ID = "+ cred.idS +" AND 	users_USER_ID = "+ cred.idU
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               // console.log('does match');
               if(results.length != 0)
               {
               var finalresult = []
               console.log("results: ",results)
               results.forEach(function(element) {
                console.log("indexOf: ",results.indexOf(element) ==  results.length - 1 ,"  ",results.indexOf(element) < results.length - 1);
                if (results.indexOf(element) < results.length - 1 )
                {
                    sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                    console.log(sql);
        
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                       element.users_USER_ID = results[0]
                       sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
                    console.log(sql);
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                       element.	statuss_STATUS_ID = results[0]
                       finalresult.push(element)
                       console.log("finalresult1  ",finalresult);

                    });
                      
                    });
                   
                    
    
                }
                else if (results.indexOf(element) ==  results.length - 1 )
                {
                    sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                    console.log(sql);
        
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                       element.users_USER_ID = results[0]
                       sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
                    console.log(sql);
                            connection.query(sql, function (error, results) {
                                console.log('does match');
                                element.statuss_STATUS_ID = results[0]
                                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.statuss_STATUS_ID.users_USER_ID
                            console.log(sql);
                
                                    connection.query(sql, function (error, results) {
                                        console.log('does match');
                                    element.statuss_STATUS_ID.users_USER_ID = results[0]
                                    
                                    finalresult.push(element)
                                    console.log("finalresult1  ",finalresult);
                                    res.json(finalresult);
                                    });
                            

                            });
                            
                    });
                }
              
              });
               }
               else
               {
                console.log("results:  ",results);
                res.json(results);
               }
              

            });
         
       // finalresult = results;
   
})

app.put('/addRepStatuts', function (req, res) {
    var statuts = req.body;
    var finalresult = [];
    
    var sql = "update status set  status = '" + statuts.status+ "', image = '" + statuts.image + "', video = '" + statuts.video + "', lai = "+statuts.lai+", lon = "+statuts.lon+", datePoste = '"+statuts.datePoste+"', type = '"+statuts.type+"', dateReplay = '"+statuts.dateReplay+"', replay_statuts = '"+statuts.replay_statuts+"', imageReplay = '"+statuts.imageReplay+"', users_USER_ID = "+statuts.users.id+" where STATUS_ID=" + statuts.id + " ;";
    connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
            connection.query("SELECT * FROM `status` WHERE STATUS_ID = "+statuts.id, function (error, results) {
                console.log('does match');
                resultList = results
                var finalresult = []
                var finalresultuser
                console.log("resultList: ",resultList)
        
              results.forEach(function(element) {
                    console.log(element);
           
                        sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                        console.log(sql);
            
                        connection.query(sql, function (error, results) {
                            console.log('does match');
                           // console.log('does match');
                           finalresultuser = results[0]
                           element.users_USER_ID = finalresultuser
                           finalresult.push(element)
                           console.log("finalresult2 ",finalresult);
                           console.log("1 record inserted");
                           res.json(element);
        
                        })
                    
                  
                  })
                })
           /* finalresult = {'msg': 'user info updated', 'status': true};
            res.json(statuts)*/

        }
        
    })
})

app.delete('/deleteStatuts/:id', function (req, res) {
    var statuts = req.params;
    connection.query("delete FROM `status` WHERE STATUS_ID =" + statuts.id, function (error, results) {
        finalresult = results;
        res.json(finalresult);
    });
})

app.put('/updateReaction', function (req, res) {
    var reaction = req.body;
    var finalresult = [];
    
    var sql = "update conf_confp set  conf_confp = " + reaction.conf_confp+ ", statuss_STATUS_ID =  " + reaction.statuss.id + " , users_USER_ID = " + reaction.users.id + " where CONF_CONFP_ID=" + reaction.id + " ;";
    connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
            sql = "SELECT * FROM `conf_confp` WHERE CONF_CONFP_ID = "+ reaction.id
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               // console.log('does match');

               var finalresult = []
               console.log("results: ",results)
               results.forEach(function(element) {
             
                    sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                    console.log(sql);
        
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                       element.users_USER_ID = results[0]
                       sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
                    console.log(sql);
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                       element.	statuss_STATUS_ID = results[0]
                       finalresult.push(element)
                       console.log("finalresult1  ",finalresult);
                       res.json(element);


                    })
                      
                })
            })
        })  
                    
    
                

        }
    })
        
   
})
app.post('/addReaction', function (req, res) {
    var reaction = req.body;
    var finalresult = [];
    var sql = "INSERT INTO conf_confp (conf_confp,statuss_STATUS_ID,users_USER_ID) " +
        "VALUES (" + reaction.conf_confp + "," + reaction.statuss.id + "," + reaction.users.id + ")";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }

        connection.query("SELECT * FROM `conf_confp` WHERE CONF_CONFP_ID =" + result.insertId, function (error, results) {
            //founduser = results[0];
         results.forEach(function(element) {
            sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               element.users_USER_ID = results[0]
               sql = "SELECT * FROM `status` WHERE STATUS_ID = "+ element.statuss_STATUS_ID
            console.log(sql);
                    connection.query(sql, function (error, results) {
                        console.log('does match');
                        element.statuss_STATUS_ID = results[0]
                        sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.statuss_STATUS_ID.users_USER_ID
                    console.log(sql);
        
                            connection.query(sql, function (error, results) {
                                console.log('does match');
                            element.statuss_STATUS_ID.users_USER_ID = results[0]
                            
                            finalresult.push(element)
                            console.log("finalresult1  ",finalresult);
                            console.log('add reaction');

                            res.json(element);
                            });
                    

                    });
                    
            });
        });
    });
    

}) 
}) 

app.delete('/deleateReaction/:id', function (req, res) {
    var reaction = req.params;
    connection.query("delete FROM `conf_confp` WHERE CONF_CONFP_ID =" + reaction.id, function (error, results) {
        finalresult = results;
        res.json(finalresult);
    });
})

app.get('/allRendez_Vous', function (req, res) {
    var cred = req.body;
    var resultList = []
    var i = 0
    connection.query("SELECT * FROM `rendez_vous`", function (error, results) {
        console.log('does match');
        resultList = results
        var finalresult = []
        var finalresultuser
        console.log("resultList: ",resultList)
        if(results.length != 0)
        {
      results.forEach(function(element) {
            console.log(element);
         
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]
                   console.log("resultListI: ",resultList[i])

                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                    console.log(resultList[i])
                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
        }
        else
        {
            res.json(results);

        }
        
    });
})

app.post('/reserver', function (req, res) {
    var rendez_vous = req.body;
    var finalresult = [];
    var sql = "INSERT INTO rendez_vous (cin,date,heure,users_USER_ID) " +
        "VALUES ('" + rendez_vous.cin + "','" + rendez_vous.date + "','" + rendez_vous.heure + "'," + rendez_vous.users.id + ")";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        console.log("rendez vous ajouter");
        finalresult = {'msg': 'rendez vous ajouter', 'status': true};
        res.json(finalresult)
    
}) 
}) 

app.get('/myStatuts/:id', function (req, res) {
    var cred = req.params;
    var resultList = []
    var i = 0
    connection.query("SELECT * FROM `status` WHERE users_USER_ID = "+cred.id, function (error, results) {
        console.log('does match');
        resultList = results
        var finalresult = []
        var finalresultuser
        console.log("resultList: ",resultList)

      results.forEach(function(element) {
            console.log(element);
            console.log("iiiii: ",i)
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]
                   console.log("resultListI: ",resultList[i])

                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                    console.log(resultList[i])
                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
          //res.json(finalresult);
       /* finalresult = results;
        res.json(finalresult);*/
    });
})

app.get('/myRendez_vous/:id', function (req, res) {
    var cred = req.params;
    var resultList = []
    var i = 0
    connection.query("SELECT * FROM `rendez_vous` WHERE users_USER_ID = "+cred.id, function (error, results) {
        console.log('does match');
        resultList = results
        var finalresult = []
        var finalresultuser
        console.log("resultList: ",resultList)
        if(resultList.length != 0)
        {
      results.forEach(function(element) {
            console.log(element);
         
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]
                   console.log("resultListI: ",resultList[i])

                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.users_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                    console.log(resultList[i])
                   element.users_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
        }
        else
        {
            res.json(results);

        }
        
    });
})

app.get('/myReclam/:id', function (req, res) {
    var cred = req.params;
    var resultList = []
    console.log(cred.id)
    connection.query("SELECT * FROM `reclammations` WHERE 	id_user_USER_ID = "+cred.id, function (error, results) {
        console.log('does match');
        resultList = results
        var finalresult = []
        var finalresultuser
        console.log(results.length)
        console.log("resultReclam: ",results)
    if(results.length != 0)
        {

       
      results.forEach(function(element) {
            console.log(element);
         
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.id_user_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]

                   element.id_user_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.id_user_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                   element.id_user_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
        }
        else
        {
            res.json(resultList);

        }
        
    });
})

app.get('/findUser/:username/:email', function (req, res) {
    var cred = req.params;
    connection.query("SELECT * FROM `users` WHERE username = '"+cred.username+"' OR email = '"+cred.email+"'", function (error, results) {
        console.log('does match');
        finalresult = results;
        console.log(results)
        res.json(finalresult);
    });
})

app.put('/updateUser', function (req, res) {
    var user = req.body;
    var finalresult = [];
    var sql = "update users set  username = '" + user.username + "', email = '" + user.email + "', role ='"+ user.role+"', user_pic = '"+user.user_pic+"'  where USER_ID =" + user.id + " ;";
    
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
            sql = "SELECT * FROM `users` WHERE USER_ID = "+ user.id
            console.log(sql);

            connection.query(sql, function (error, results) {
                console.log('does match');
               // console.log('does match');

               var finalresult = []
               console.log("results: ",results)
               console.log("1 record inserted");
               finalresult = {'msg': 'user info updated', 'status': true};
               res.json(results[0])
           
        })  
            
        }
      
    });
})
app.put('/updateUserPassword', function (req, res) {
    var user = req.body;
    var finalresult = [];

                    let data = user.password; // encoded data
                    let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used
                    console.log("decodedData3: ",decodedData); // output: Hello World
                    bcrypt.hash(decodedData, saltRounds, function (err, bcryptedPassword) {
                        console.log("bcryptedPassword3: ",bcryptedPassword);
                        var sql = "update users set   password = '" + bcryptedPassword + "' where USER_ID =" + user.id + " ;";
                        connection.query(sql, function (err, result) {
                            if (err) {
                                finalresult = {'msg': err, 'status': false};
                                res.json(finalresult)
                                throw err;
                            }
                            else
                            {
                                sql = "SELECT * FROM `users` WHERE USER_ID = "+ user.id
                                console.log(sql);
                    
                                connection.query(sql, function (error, results) {
                                    console.log('does match');
                                   // console.log('does match');
                    
                                   var finalresults = results[0]
                                   finalresults.password = data
                                   console.log("results: ",results)
                                   console.log("1 record inserted");
                                   finalresult = {'msg': 'user info updated', 'status': true};
                                   res.json(finalresults)
                               
                            })  
                                
                            }
                        });
                    });
    console.log(sql);
   
})
app.get('/allnews', function (req, res) {
    var cred = req.body;
    connection.query("SELECT * FROM `news`", function (error, results) {
        console.log('does match');
        finalresult = results;
        res.json(finalresult);
    });
})

app.get('/allEvenement', function (req, res) {
    var cred = req.body;
    connection.query("SELECT * FROM `evenement`", function (error, results) {
        console.log('does match');
        finalresult = results;
        res.json(finalresult);
    });
})

app.get('/allRendez_Vous', function (req, res) {
    var cred = req.body;
    connection.query("SELECT * FROM `rendez_vous`", function (error, results) {
        console.log('does match');
        finalresult = results;
        res.json(finalresult);
    });
})

app.get('/allReclam', function (req, res) {
    var cred = req.body;
    var resultList = []

    connection.query("SELECT * FROM `reclammations`", function (error, results) {
        console.log('does match');
        resultList = results;
        var finalresult = []
        var finalresultuser
        console.log("resultList: ",resultList)
        if(results.length != 0)
        {
      results.forEach(function(element) {
            console.log(element);
            if (results.indexOf(element) < results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.id_user_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');

                   finalresultuser = results[0]
                   console.log("resultListI: ",resultList[i])

                   element.id_user_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult1  ",finalresult);
    
                });
               
                

            }
            else if (results.indexOf(element) ==  results.length - 1 )
            {
                sql = "SELECT * FROM `users` WHERE USER_ID = "+ element.id_user_USER_ID
                console.log(sql);
    
                connection.query(sql, function (error, results) {
                    console.log('does match');
                   // console.log('does match');
                   finalresultuser = results[0]
                   element.id_user_USER_ID = finalresultuser
                   finalresult.push(element)
                   console.log("finalresult2 ",finalresult);
                   
                   res.json(finalresult);

                });
            }
          
          });
        }
        else
        {
            res.json(finalresult);
        }
    });
})

app.get('/allUsers', function (req, res) {
    var cred = req.body;
    connection.query("SELECT * FROM `users`", function (error, results) {
        console.log('does match');
        finalresult = results;
        res.json(finalresult);
    });
})

app.post('/addEvenement', function (req, res) {
    var evenement = req.body;
    var finalresult = [];
    var sql = "INSERT INTO evenement (date_evenement,description,image_evenement,time_evenement,titre) " +
        "VALUES ('" + evenement.date_evenement + "','" + evenement.description + "','" + evenement.image_evenement + "','" + evenement.time_evenement + "','" +evenement.titre+"' )";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        console.log("evenement ajouter");
        finalresult = {'msg': 'evenement ajouter', 'status': true};
        res.json(finalresult)
    
}) 
}) 

app.put('/updateEvenement', function (req, res) {
    var evenement = req.body;
    var finalresult = [];
    var sql = "update evenement set  date_evenement = '" + evenement.date_evenement + "', description = '" + evenement.description + "', image_evenement = '" + evenement.image_evenement + "', time_evenement ='"+ evenement.time_evenement+"', titre = '"+evenement.titre+"'  where Evenement_ID =" + evenement.id + " ;";
    connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
          
               console.log("1 record inserted");
               finalresult = {'msg': 'user info updated', 'status': true};
               res.json(finalresult)
           
     
        }
      
    });
})

app.post('/addNews', function (req, res) {
    var news = req.body;
    var finalresult = [];
    var sql = "INSERT INTO news (date,description,image,timeZone,title) " +
        "VALUES ('" + news.date + "','" + news.description + "','" + news.image + "','" + news.timeZone + "','" +news.title+"' )";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        console.log("news ajouter");
        finalresult = {'msg': 'news ajouter', 'status': true};
        res.json(finalresult)
    
}) 
}) 

app.post('/addReclammation', function (req, res) {
    var reclammations = req.body;
    var finalresult = [];
    var sql = "INSERT INTO reclammations (dateReclam,dateRepReclam,image_rec,lai,lon,rep_rec,text,id_user_USER_ID) " +
        "VALUES ('" + reclammations.dateReclam + "','" + reclammations.dateRepReclam + "','" + reclammations.image_rec + "'," + reclammations.lai + ", " +reclammations.lon+",'" +reclammations.rep_rec+"', '"+reclammations.text+"', "+reclammations.id_user.id+" )";
    console.log(sql)
        connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        console.log("news ajouter");
        finalresult = {'msg': 'news ajouter', 'status': true};
        res.json(finalresult)
    
}) 
}) 

app.put('/updateRecl', function (req, res) {
    var reclammations = req.body;
    var finalresult = [];
    
    var sql = "update reclammations set  dateReclam = '" + reclammations.dateReclam+ "', dateRepReclam = '" + reclammations.dateRepReclam + "', image_rec = '" + reclammations.image_rec + "', lai = "+ reclammations.lai+" , lon = "+reclammations.lon+", rep_rec ='"+reclammations.rep_rec+"', text = '"+reclammations.text+"' , id_user_USER_ID = "+reclammations.id_user.id+"  where CONF_CONFP_ID=" + reaction.id + " ;";
    connection.query(sql, function (err, result) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
            console.log("1 record inserted");
            finalresult = {'msg': 'reclam info updated', 'status': true};
            res.json(finalresult)
                
    
                

        }
    })
        
   
})



  
app.use('/UploadedImages',express.static('Ressources/Services'))
app.post('/UploadImage', function(req, res) {
    var fileName = "" ;
    var upload = multer({ dest: 'Ressources/Services/'}).single('file')
    upload(req, res, function(err) {
        console.log(req.body.filename)
        if (err) {
            console.log("Error uploading file: " + err)
            return
        }
        fs.rename('./Ressources/Services/' + req.file["filename"], './Ressources/Services/' + req.body.filename, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
        fileName += req.file["filename"] ;
        res.json(req.body.filename);
    })
});
