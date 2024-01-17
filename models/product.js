const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    

    name:{
        type:String,
      
    },
    price:{
        type:Number,
      
        min:0
    },

    category:{
        type:String,
     
        enmu:['computer','tv','smart']
    }
        

})

const Product = mongoose.model('Product',productSchema);
module.exports= Product;


