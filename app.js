var express = require('express');
var app = express();
var cors = require('cors');
const multer = require('multer');
const DIR = 'Ressources/imageresto';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR, file.size);
      
    },
    filename: (req, file, cb) => {
  
        cb(null, file.originalname, file.size) ;
    }
  
  
}

);

let upload = multer({storage: storage});


var UserController = require('./entities/userController');
var ProduitController=require('./entities/ProduitController')
var AddressController=require('./entities/addressController')
var RestaurantController=require('./entities/restaurantController')
var RestoCatController=require('./entities/restaurant-catController')
var CategorieController = require('./entities/CategorieController');
var commandeController = require('./entities/commandeController');
var panierController = require('./entities/panierControlleur');
var commandeProduitControlleur = require('./entities/commandeProduitControlleur');


app.use(cors());
app.use('/UploadedImages',express.static('Ressources/imagesresto'))


app.use('/entities', UserController);
app.use('/entities', ProduitController);
app.use('/entities', AddressController);
app.use('/entities', RestaurantController);
app.use('/entities', RestoCatController);
app.use('/entities', CategorieController);
app.use('/entities', commandeController);
app.use('/entities', panierController);
app.use('/entities', commandeProduitControlleur);
app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received successfully');
        return res.send({
          success: true
        })
      }
});


module.exports = app;