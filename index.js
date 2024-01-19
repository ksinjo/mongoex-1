
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodoverride = require('method-override');
const categories = ['computer','tv','smart'];

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
app.use(methodoverride('_method'));

app.get('/products',async (req,res)=>{
    const products = await Product.find({})
    // console.log(products)
    res.render('products/index',{products})
})

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})
app.get('/products/:id', async(req,res)=>{
    const{ id } = req.params;
    const product = await Product.findById(id);
    // console.log(product);
    res.render('products/show',{product})
})

app.get('/products/:id/edit', async(req,res)=> {
    const{ id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product,categories})
})


app.post('/products',async(req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
 
    res.redirect(`/products/${newProduct._id}`);
   
})


app.put('/products/:id', async (req,res)=>{
    const{ id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true});
    console.log(req.body);
    res.redirect(`/products/${product.id}`);
})

app.delete('/prodcuts/:id', async(req,res)=>{
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    console.log(deleteProduct);
    res.redirect("/products");
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