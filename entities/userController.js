var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./user');
var bcrypt = require('bcrypt');
const saltRounds = 5;



router.get('/getUsers', function (req, res) {
    User.getUsers(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/login', function (req, res) {
    User.loginUsers(req.body,function(err,rows){
        if (rows[0] != null) {
            founduser = rows[0];
            var hash = rows[0].password;
          
            let data = req.body.password; // encoded data
           let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used
            
           console.log(decodedData)
           bcrypt.compare(decodedData, hash, function (err, doesMatch) {
                if (doesMatch) {
                    console.log('does match');
                    console.log(founduser);
                    
                    founduser.password = data
                    finalresult = {'msg': 'Logged', 'status': true, 'data': founduser};
                    console.log(finalresult)

                    res.json(finalresult)
                    //password matchs
                } else {
                    console.log('doesn\'t match');
                    //password doesn't match
                    finalresult = {'msg': 'Check your password', 'status': false};
                    res.json(finalresult)
                  
                }
            });
          
           
        } else {
            console.log('doesn\'t match2'+err);
            //password doesn't match
            finalresult = {'msg': 'Check yout identified ', 'status': false};
            console.log(finalresult);
            res.json(finalresult)
        }
  
      
    });
})
router.post('/signUp', function (req, res) {
 
    User.getUserByUserName(req.body,function(err,rows){
        if(err) {
            res.status(400).json(err);
            console.log(err);
        }
        else if (rows.length > 0)
        {
            finalresult = {'msg': 'username already used', 'status': false};
            res.json(finalresult);
            console.log(finalresult);

        }
        else{
             User.getUserByemail(req.body,function(err,rows){
            if(err) {
                res.status(400).json(err);
                console.log(err);

            }
            else if (rows.length > 0)
            {
                finalresult = {'msg': 'email already used', 'status': false};
                res.json(finalresult);
                console.log(finalresult);

            }
            else{
              
        
                    let data = req.body.password; // encoded data
                    console.log(data);
                    let decodedData = Buffer.from(data, 'base64').toString('ascii'); // output string in ascii character encoding. utf8 & other encoding can also be used                                          
                        bcrypt.hash(decodedData, saltRounds, function (err, bcryptedPassword) {       
                            req.body.password=bcryptedPassword;
                            User.registerUser(req.body,function (err, result) {
                                if (err) {
                                    finalresult = {'msg': err, 'status': false};
                                    res.json(finalresult);
                                    console.log(finalresult);

                                }
                                console.log("1 record inserted");
                                console.log(result);
                                
                                User.getUserbyId(result, function (error, results) {
                                   
                                    console.log(results);
                                    finalresult = {'msg': 'user added', 'status': true, 'insertedId' : result.insertId, 'data':results[0]};
                                    console.log(finalresult);
                                    res.json(finalresult);
                                    console.log(finalresult);

                                });
                             
                            });
                        });
                   
                }
            })
            }
                   
                
                
            
       
   
    })
   
 
})


router.put('/updateUser', function (req, res) {
    User.updateUser(req.body,function(err,rows) {
        if (err) {
            finalresult = {'msg': err, 'status': false};
            res.json(finalresult)
            throw err;
        }
        else
        {
            User.getUserbyId(req.body, function (error, results) {
                                   
               console.log("results: ",results)
               console.log("1 record inserted");
               finalresult = {'msg': 'user info updated', 'status': true, 'data': results[0]};
               res.json(finalresult);
           
            });  
            
        }
      
    });
})
module.exports = router;