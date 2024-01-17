
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/device')
.then(()=>{
    console.log("Open MongoDB");
})
.catch((e) => {
    console.log(e);
})


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));


app.get('/products',async (req,res)=>{
    const products = await Product.find({})
    console.log(products)
    res.render('products/index',{products})
})

app.get('/products/new',(req,res)=>{
    res.render('products/new')
})
app.get('/products/:id', async(req,res)=>{
    const{ id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show',{product})
})

app.get('/products/:id/edit', async(req,res)=> {
    const{ id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product})
})


app.post('/products',async(req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
   
})


app.listen(3333,()=>{
 console.log('start Express');
})






// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Device')
// .then(()=> {
//     console.log("connect DB");
// })
// .catch((e)=> {
//     console.log(e);
// })

// app.set('views',path.join('__dirname'));
// app.set('view engine','ejs');
// app.get('/dog',(req,res)=> {
//     res.send('woo');
// })



// app.listen(3000,()=>{
//     console.log(" Open express Server ");
// })