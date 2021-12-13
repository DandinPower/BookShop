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
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where P.category = "${req.params.name}" and B.id = A.id and P.businessId = B.id;`
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
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where B.id = A.id and P.businessId = B.id;`
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

router.post('/manage/add', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    var description = req.body.description
    var name = req.body.name
    var price = req.body.price
    var status = req.body.status
    var category = req.body.category
    var image = req.body.image
    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
    var response = {
        "error":"",
        "state":0
    }
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                const sqlInsert = `insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (${businessId},"${description}","${name}",${price},"${status}","${category}","${image}","${currentDate}");`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["state"] = 200
            }catch(e){
                response["error"] = "新增商品失敗"
                response["state"] = 500
            }
        }
        else{
            response["error"] = "找不到使用者"
           response["state"] = 500
        }
        
    }catch(e){
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/search', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    var response = {
        "error":"",
        "state":0
    }
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                const sqlInsert = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.launch,P.status,P.category,P.image,P.uploadedDate from business as B,product as P,account as A where B.id = A.id and P.businessId = ${businessId} and P.businessId = B.id;`
                var result = await database.sqlConnection(sqlInsert)
                var response = []
                console.log(result)
                result.forEach(function(item, index, array) {
                    let product = datatype.json2json(item)
                    console.log(product)
                    response.push(product)
                });
            }catch(e){
                response["error"] = "查找商品失敗"
                response["state"] = 500
            }
        }
        else{
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    }catch(e){
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/update', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var productId = req.body.productId
    var description = req.body.description
    var name = req.body.name
    var price = req.body.price
    var status = req.body.status
    var category = req.body.category
    var image = req.body.image
    var response = {
        "error":"",
        "state":0
    }
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                const sqlInsert = `update product set description = "${description}",name = "${name}",price = ${price},status = "${status}",category = "${category}",image = "${image}" where no = ${productId};`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["state"] = 200
            }catch(e){
                console.log(e)
                response["error"] = "修改商品失敗"
                response["state"] = 500
            }
        }
        else{
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    }catch(e){
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/launch', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var productId = req.body.productId
    var launch = req.body.launch
    var response = {
        "error":"",
        "state":0
    }
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                const sqlInsert = `update product set launch = "${launch}" where no = ${productId};`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["state"] = 200
            }catch(e){
                console.log(e)
                response["error"] = "修改上下架失敗"
                response["state"] = 500
            }
        }
        else{
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    }catch(e){
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/order/search', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                let response = []
                var sqlSearch = `select P.no as productId,P.price,P.name,O.orderNo,O.quantity,O.status,O.orderDate,O.arrivalDate,O.customerId from product as P,orders as O,manage as M,business as B where P.no = M.productId and O.orderNo = M.orderNo and M.businessId = ${businessId} and B.id = M.businessId;`
                console.log(sqlSearch)
                var result = await database.sqlConnection(sqlSearch)
                result.forEach(function(item, index, array) {
                    let product = datatype.json2json(item)
                    console.log(product)
                    response.push(product)
                  });
                res.json(response)
            }catch(e){
                console.log(e)
                let response = {
                    "error":"找尋訂單失敗",
                    "state":500
                }
                res.json(response)
            }
        }
        else{
            console.log(e)
            let response = {
                "error":"找不到使用者",
                "state":500
            }
            res.json(response)
        }
        
    }catch(e){
        console.log(e)
        let response = {
            "error":"找不到使用者",
            "state":500
        }
        res.json(response)
    }
})

router.post('/manage/order/status', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var orderNo= req.body.orderNo
    var status = req.body.status
    var response = {
        "error":"",
        "state":0
    }
    try{
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null){
            try{
                const sqlUpdate = `update orders set status = "${status}" where orderNo = ${orderNo} and orderNo = (select orderNo from manage where businessId = ${businessId});`
                var result = await database.sqlConnection(sqlUpdate)
                if (result["affectedRows"] == 0){
                    response["error"] = "找不到該訂單"
                    response["state"] = 500
                }
                else{
                    console.log(result)
                    response["state"] = 200
                }
            }catch(e){
                console.log(e)
                response["error"] = "修改訂單status失敗"
                response["state"] = 500
            }
        }
        else{
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    }catch(e){
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/order/comment', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName
    var orderNo= req.body.orderNo
    var star = req.body.star 
    var comment = req.body.comment 
    var response = {
        "error":"",
        "state":0
    }
    try{
        var customerId = await database.GetUserId(userName)
        console.log(customerId)
        if (customerId != null){
            try{
                const sqlSearch = `select productId from manage where orderNo = ${orderNo};`
                var result = await database.sqlConnection(sqlSearch)
                if (result.length == 0){
                    response["error"] = "找不到該訂單"
                    response["state"] = 500
                }
                else{
                    productId = result[0]["productId"]
                    if (star < 5 & star >= 0){
                        try{
                            const sqlInsert = `insert into product_comment(productId,customerId,orderNo,star,comment) value(${productId},${customerId},${orderNo},${star},"${comment}");`
                            let result = await database.sqlConnection(sqlInsert)
                            console.log(result)
                            response["state"] = 200
                        }catch(e){
                            console.log(e)
                            response["error"] = "插入評論失敗"
                            response["state"] = 500
                        }
                    }
                    else{
                        response["error"] = "評價超出限制"
                        response["state"] = 500
                    }
                    
                }
            }catch(e){
                console.log(e)
                response["error"] = "找不到該訂單"
                response["state"] = 500
            }
        }
        else{
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    }catch(e){
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})


module.exports = router