const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const router = express.Router()

router.post('/add', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    var productId = req.body.productId;
    var id = await database.GetUserId(userName)
    var response = {
        "error":"",
        "state":0
    }
    const sqlCheck = `select status from product where no = ${productId}`
    const sqlInsert = `insert into product_list(customerId,productId)value(${id},${productId});`
    console.log(sqlCheck)
    try {
        result = await database.sqlConnection(sqlCheck);
        let status = result[0]["status"]
        console.log(status);
        if (status == "1") {
            try{
                result = await database.sqlConnection(sqlInsert);
                console.log(result);
                response["state"] = 200
            }catch(e){
                console.log(e);
                response["error"] = "找不到使用者"
                response["state"] = 500
            }
        } 
        else if(status == "0"){
            response["error"] = "沒有庫存"
            response["state"] = 500
        }
    } catch(e){
        console.log(e);
        response["error"] = "查詢商品失敗"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/update', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var productId = req.body.productId
    var quantity = req.body.quantity
    var id = await database.GetUserId(userName)
    var response = {
        "error":"",
        "state":0
    }
    const sqlCheck = `select status from product where no = ${productId}`
    const sqlUpdate = `update product_list set quantity = ${quantity} where customerId = ${id} and productId = ${productId};`
    console.log(sqlCheck)
    try {
        result = await database.sqlConnection(sqlCheck);
        let status = result[0]["status"]
        console.log(status);
        if (status == "1") {
            try{
                result = await database.sqlConnection(sqlUpdate);
                result = datatype.json2json(result)
                console.log(result);
                if (result["affectedRows"] != 0){
                    response["state"] = 200
                }
                else {
                    response["error"] = "購物車沒有這項商品"
                    response["state"] = 500
                }
            }catch(e){
                console.log(e);
                response["error"] = "放入資料庫失敗"
                response["state"] = 500
            }
        } 
        else if(status == "0"){
            response["error"] = "沒有庫存"
            response["state"] = 500
        }
    } catch(e){
        console.log(e);
        response["error"] = "查詢商品失敗"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/all', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var id = await database.GetUserId(userName)
    const sql = `select P.no as productId,A.name as businessName,P.name,P.price,P.image,PL.quantity
                    from product as P,account as A,customer as C,product_list as PL 
                    where PL.customerId = ${id} and PL.customerId = C.id and PL.productId = P.no and A.id = P.businessId;`
    console.log(sql)
    try {
        let response = []
        result = await database.sqlConnection(sql);
        result.forEach(function(item, index, array) {
            let product = datatype.json2json(item)
            console.log(product)
            response.push(product)
          });
        res.json(response)
    } catch(e){
        let response = {
            "error":"查詢購物車失敗",
            "state":500
        }
        res.json(response)
    }
})

router.post('/delete', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    var productId = req.body.productId;
    var id = await database.GetUserId(userName)
    const sql = `delete from product_list where customerId = ${id} and productId = ${productId};`
    console.log(sql)
    var response = {
        "error":"",
        "state":0
    }
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        if (result["affectedRows"] != 0){
            response["state"] = 200
        }
        else {
            response["error"] = "購物車沒有這項商品"
            response["state"] = 500
        }
    } catch(e){
        console.log(e);
        response["error"] = "資料庫刪除失敗"
        response["state"] = 500
    }
    res.json(response)
})


router.post('/deleteall', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    var id = await database.GetUserId(userName)
    const sql = `delete from product_list where customerId = ${id};`
    console.log(sql)
    var response = {
        "error":"",
        "state":0
    }
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        if (result["affectedRows"] != 0){
            response["state"] = 200
        }
        else {
            response["error"] = "購物車沒有這項商品"
            response["state"] = 500
        }
    } catch(e){
        console.log(e);
        response["error"] = "資料庫刪除失敗"
        response["state"] = 500
    }
    res.json(response)
})

module.exports = router