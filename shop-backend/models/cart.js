var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    product: {
        name: {type:String, required:true},
        categories: [{type:String}],
        imageUrl: {type:String, required:true},
        price:{type:Number, required:true},
        writer: {type:String, required:true},
        description: {type:String, required:true}
    },
    quantity:{type:Number, required:true},
    amount: {type:Number, required:true},
    deliveryDate: {type:Date, required:true}
})

module.exports = mongoose.model('Cart', schema);