const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const router = express.Router()

router.get('/categories', async (req, res, next)=> {        
    const sql = `SELECT distinct category FROM product;`
    response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        result.forEach(function(item, index, array) {
            response.push(item['category'])
          });
    } catch(e){
        console.log(e);
    }
    res.send(response)
})

router.get('/category/:name', async (req, res, next)=> {        
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where P.category = "${req.params.name}" and B.id = A.id;`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        result.forEach(function(item, index, array) {
            let product = datatype.json2json(item)
            console.log(product)
            response.push(product)
          });
    } catch(e){
        console.log(e);
    }
    res.json(response)
})

router.get('/all', async (req, res, next)=> {        
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where B.id = A.id;`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        result.forEach(function(item, index, array) {
            let product = datatype.json2json(item)
            console.log(product)
            response.push(product)
          });
    } catch(e){
        console.log(e);
    }
    res.json(response)
})

router.post('/add', async (req, res, next)=> {      
    req.forEach(function(item, index, array) {
        let product = datatype.json2json(item)
        var userName = product.body.userName;
        var token = product.body.token;
        var productId = product.body.productId;
        var quantity = product.body.quantity;
        const sql = ``
        console.log(sql)
        try {
            result = await database.sqlConnection(sql);
            console.log(result);
        } catch(e){
            console.log(e);
        }
      });
    res.send(response)
})

router.post('/search', async (req, res, next)=> {        
    var userName = req.body.userName;
    var token = req.body.token;
    const sql = ``
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
    } catch(e){
        console.log(e);
    }
    res.send(response)
})



module.exports = router