var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var Product = require('./models/product');
var User = require('./models/user');
var categories = require('./models/categories');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var passport = require('passport');
var passportConfig = require('./config/passport')
var authentication = require('./controller/authentication')
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var cors = require("cors");
var ctrlProfile = require("./controller/profile")


var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(cors());
app.use(passport.initialize());
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });


mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true}, (error)=>{
    if(error){ console.log("Error in connection", error)}
    else { console.log(" connected to db")}
});
var Schema = new mongoose.Schema({})

app.get("/", function(req,res){
    console.log(req);
    res.send("hi");    
})


app.get("/products", function(req, res){
    Product.find(function(err, docs){
        var productChunks = [];
        for(var i=0; i<docs.length; i=i+3){
        productChunks.push(docs);
        }
        res.send({products:productChunks});
        });
})
app.get("/categories", function(req,res){
    console.log("");
    categories.find(function(err,docs){
        var categories=docs;
        res.send({categories:categories});
    })
})

app.post('/products', (req, res) => {
    console.log(req.body);
    Product.insertMany(req.body,function(data,error){
                if (error) { console.log("error orrcured", error)} 
                console.log("1 document inserted");
            })
    res.status(200).send({"message":"Data Recieved"});
  })

app.post('/addtocart', (req, res) => {
    console.log(req.body);
    Cart.insertMany(req.body,function(data,error){
                if (error) { console.log("error orrcured", error)} //throw error;
                console.log("1 document inserted");
            })
    res.status(200).send({"message":"Data Recieved"});
  })


app.get('/profile', auth, ctrlProfile.profileRead);
app.post('/register', authentication.register);
app.post('/login', authentication.login);
// app.post('/login', (req, res) => {
//     User.find(function(err,docs){
//         var users=docs;
//         var user;
//         console.log(req.body);
//         for(var i=0; i<users.length; i++){
//             console.log(users[i]);
//             if(users[i].email == req.body.email && users[i].password == req.body.password){
//                 console.log("got user")
//                 user = users[i];
//                 break;
//             }
//         }
//         if(user) {
//             res.status(200).send(user);
//         } else {
//             res.status(401).send({"message":"user not found"})
//         }
//     })
// })
// app.post('/signup', (req,res) => {
//     User.insertMany(req.body, function(data,error){
//         if(error) { console.log("error in inserting" , error)}//throw error;
//         console.log("user inserted");
//     })
//     res.status(200).send({"message":"user created"});
// })

app.listen(4000, function(){
    console.log("server started");
})
