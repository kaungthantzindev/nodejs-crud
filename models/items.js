const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const itemScheme = new Scheme({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{timestamps:true})

const Item = mongoose.model('Item', itemScheme)
module.exports = Item;