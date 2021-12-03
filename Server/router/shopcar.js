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

router.post('/all', async (req, res, next)=> {        
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

router.post('/delete', async (req, res, next)=> {        
    var userName = req.body.userName;
    var token = req.body.token;
    var productId = req.body.productId;
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

router.post('/delete', async (req, res, next)=> {        
    var userName = req.body.userName;
    var token = req.body.token;
    var productId = req.body.productId;
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

router.post('/deleteall', async (req, res, next)=> {        
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