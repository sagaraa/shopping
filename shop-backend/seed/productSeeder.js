var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});
var products = [ 
    new Product({
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
        name: 'Gothic Video Game1',
        description: 'Awesome Game',
        price: 10,
        writer: "Sagar Arora",
        categories: ["Action", "Drama", "Comedy"]
    }),
    new Product({
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
        name: 'Gothic Video Game2',
        description: 'Awesome Game',
        price: 10,
        writer: "Sagar Arora",
        categories: ["Action", "Drama", "Comedy"]

    }),
    new Product({
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
        name: 'Gothic Video Game3',
        description: 'Awesome Game',
        price: 10,
        writer: "Sagar Arora",
        categories: ["Action", "Drama", "Comedy"]
    }),
    new Product({
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
        name: 'Gothic Video Game4',
        description: 'Awesome Game',
        price: 10,
        writer: "Sagar Arora",
        categories: ["Action", "Drama", "Comedy"]
    })
]

var done = 0;
for(var i=0; i<products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
