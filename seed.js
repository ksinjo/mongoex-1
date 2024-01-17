const exrpess = require('express');
const app = exrpess();
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/device')
.then(()=>{
    console.log("DB Connect");
})
.catch((e)=> {
    console.log(e);
})


const hotkeybords =[
    {
        name:'razer Blackwindow V4',
        price:320,
        category:'computer'
    },

    {
        name:'gx787se Master',
        price:89,
        category:'computer'
    },

    {
        name:'cox ck420',
        price:38.5,
        category:'computer'

    },

    {
        name:'appco Hacker K15',
        price:37.9,
        category:'computer'


    },

    {
        name: 'samsumgDDR-4G',
        price:22,
        category:'computer'

    }

]

Product.insertMany(hotkeybords)
.then(res => {
    console.log(res);
})
    .catch(e => {
        console.log(e);
    })