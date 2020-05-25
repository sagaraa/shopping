var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type:String, required:true},
    categories: [{type:String}],
    imageUrl: {type:String, required:true},
    price:{type:Number, required:true},
    writer: {type:String, required:true},
    description: {type:String, required:true}
})

module.exports = mongoose.model('Product', schema);