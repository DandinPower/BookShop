const { request } = require('express')
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
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where P.category = "${req.params.name}" and B.id = A.id and P.businessId = B.id;`
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
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where B.id = A.id and P.businessId = B.id;`
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

router.post('/add', datatype.verifyTokenByList,async (req, res, next)=> {       
    var state = true
    var request = req.body
    var response = {
        "error":"",
        "state":0
    }
    var result = await Promise.all(request.map(async(item,index,array)=>{
        let product = datatype.json2json(item)
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
        var userName = product["userName"]
        var productId = product["productId"]
        var quantity = product["quantity"]
        try{
            var customerId = await database.GetUserId(userName)
            console.log(customerId)
            try{
                var businessId = await database.GetBusinessId(productId)
                console.log(businessId)
                try{
                    const sqlInsert = `insert into orders(customerId,orderDate,quantity)value(${customerId},"${currentDate}",${quantity});`
                    console.log(sqlInsert)
                    var InsertResult = await database.sqlConnection(sqlInsert)
                    console.log(InsertResult)
                    var insertId = InsertResult["insertId"]
                    try{
                        const sqlManage = `insert into manage(businessId,orderNo,productId)value(${businessId},${insertId},${productId});`
                        console.log(sqlManage)
                        var ManageResult = await database.sqlConnection(sqlManage)
                        console.log(ManageResult)
                    }catch(e){
                        console.log(e)
                        response["error"] = "插入manage失敗"
                        response["state"] = 500
                        state = false
                        return "fail"
                    }
                }catch(e){
                    console.log(e)
                    response["error"] = "插入order失敗"
                    response["state"] = 500
                    state = false
                    return "fail"
                }         
            }catch(e){
                console.log(e)
                response["error"] = "找不到廠商"
                response["state"] = 500
                state = false
                return "fail"
            }
            
        }catch(e){
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
            state = false
            return "fail"
        }
        
        return "true"   
    }));
    if (state){
        response["state"] = 200
    }
    res.json(response)
})

router.post('/search', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    try{
        var customerId = await database.GetUserId(userName)
        console.log(customerId)
        try{
            let response = []
            var sqlSearch = `select P.price,P.name,O.quantity,O.status,O.orderDate,O.arrivalDate from product as P,orders as O,manage as M,customer as C where P.no = M.productId and O.orderNo = M.orderNo and O.customerId = ${customerId} and C.id = O.customerId;`
            console.log(sqlSearch)
            var result = await database.sqlConnection(sqlSearch)
            result.forEach(function(item, index, array) {
                let product = datatype.json2json(item)
                console.log(product)
                response.push(product)
              });
            res.json(response)
        }catch(e){
            let response = {
                "error":"找尋訂單失敗",
                "state":500
            }
            res.json(response)
        }
    }catch(e){
        let response = {
            "error":"找不到使用者",
            "state":500
        }
        res.json(response)
    }
})



module.exports = router