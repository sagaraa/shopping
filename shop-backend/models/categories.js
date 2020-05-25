var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    categories: [{type:String}]
})

module.exports = mongoose.model('categories', schema);