const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const datatype = require('../function/datatype')
const router = express.Router()


//註冊請求
router.post('/register', async (req, res, next)=> {        
    var data = req.body
    let _userName = data["userName"]
    let _userPassword = data["userPassword"]
    let _name = data["name"]
    let _gender = data["gender"]
    let _email = data["email"]
    let _phone = data["phone"]
    let _address = data["address"]
    let _type = data["type"]
    
    //放入Table `account`之中
    const sql = `insert into account (address,gender,phone,email,password,userName,name) values ("${_address}","${_gender}","${_phone}","${_email}","${_userPassword}","${_userName}","${_name}");`
    var sql2 = ``;
    console.log(sql)
    var response = {
        "error":"",
        "state":""
    }
    if (_type == "customer" | _type == "business"){
        try {
            let result = await database.sqlConnection(sql);
            response["state"] = "200";
            console.log(result)
            if (_type == "customer"){
                sql2 = `insert into customer (id) value (${result["insertId"]});`;
            }
            else if (_type == "business"){
                sql2 = `insert into business (id) value (${result["insertId"]});`;
            }
            if (_phone.length == 10){
                try {
                    let result = await database.sqlConnection(sql2);
                    response["state"] = "200";
                    console.log(result)
                } catch(e){
                    response["error"] = "註冊失敗"
                    response["state"] = "500"
                    console.log(e)
                }
            }
            else{
                response["error"] = "電話號碼不符合10位數"
                response["state"] = "500"
            }
            
        } catch(e){
            response["error"] = "註冊失敗"
            response["state"] = "500"
            console.log(e)
        }
    }
    else{
        response["error"] = "未指定用戶類別"
        response["state"] = "500"
    }
    res.json(response)
})

//登入請求
router.post('/login', async (req, res, next)=> {        
    
    var loginData = {
        "userName":req.body.userName,
        "userPassword": req.body.userPassword,
    }
    var response = {
        "type":"",
        "name":"",
        "userName":"",
        "token":"",
        "error":"",
        "state":""
    }
    try{
        var userId = await database.GetUserId(loginData["userName"])
        console.log(userId)
        const sql = `select a.userName,a.password,a.name,c.paymentInfo as info from account as a,customer as c where a.id = c.id and a.id = ${userId} union select a.userName,a.password,a.name,b.logo as info from account as a,business as b where a.id = b.id and a.id = ${userId};`
        console.log(sql)
        try {
            result = await database.sqlConnection(sql);
            console.log(result.length);
            if (result.length == 0){
                response["error"] = "登入失敗"
                response["state"] = "500"
                res.json(response)
            }
            else{
                var name = result[0].name
                var password = result[0].password
                var userName = result[0].userName
                if (result[0].info == "現金" || result[0].info == "信用卡"){
                    var type = "customer"
                }
                else {
                    var type = "business"
                }
                console.log(result)
                let setToken = {
                    userName : result[0].userName
                }
                let token = jwt.sign(
                    JSON.parse(JSON.stringify(setToken)), 
                    'ThisIsSecurityMix@TPE&4255',
                    {expiresIn: 60*6*24}
                )
                if (password != loginData.userPassword){
                    response["error"] = "登入失敗"
                    response["state"] = "500"
                    res.json(response)
                }
                else{
                    response["type"] = type
                    response["name"] = name
                    response["userName"] = userName
                    response["token"] = token
                    response["state"] = "200"
                    res.json(response)
                }
            }
        } catch(e){
            console.log(e);
        }
    }catch(e){
        response["error"] = "登入失敗"
        response["state"] = "500"
        res.json(response)
    }
    
})

router.post('/login/check',datatype.verifyToken,(req, res)=> {
    res.json({
        "error":"",
        "state":200
    })
})


router.post('/search', datatype.verifyToken,async (req, res, next)=> {        
    var checkState = true
    var userName = req.body.userName;
    var response = {
        "type":"",
        "userName": userName,
		"userPassword": "",
		"name":"",
		"gender":"",
		"email":"",
		"phone":"091234567",
		"address":"",
		"paymentInfo":"",
		"description":"",
		"logo":"",
		"error":"",
		"state":0
    }
    try{
        var userId = await database.GetUserId(userName)
        console.log(userId)
        if (userId != null){
            try{
                var sqlCustomer = `select A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,C.paymentInfo from account as A,customer as C where A.id = C.id and C.id = ${userId};`
                var result = await database.sqlConnection(sqlCustomer)
                console.log(result)
                if (result.length != 0){
                    response["type"] = "customer"
                    response["userPassword"] = result[0]["userPassword"]
                    response["name"] = result[0]["name"]
                    response["gender"] = result[0]["gender"]
                    response["email"] = result[0]["email"]
                    response["phone"] = result[0]["phone"]
                    response["address"] = result[0]["address"]
                    response["paymentInfo"] = result[0]["paymentInfo"]
                    response["state"] = 200
                    checkState = false
                    res.json(response)
                }
            }catch(e){
                let response = {
                    "error":"網路連線錯誤",
                    "state":500
                }
                res.json(response)
            }
            try{
                var sqlBusiness = `select A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,B.description,B.logo from account as A,business as B where A.id = B.id and B.id = ${userId};`
                var result = await database.sqlConnection(sqlBusiness)
                console.log(result)
                if (result.length != 0){
                    response["type"] = "business"
                    response["userPassword"] = result[0]["userPassword"]
                    response["name"] = result[0]["name"]
                    response["gender"] = result[0]["gender"]
                    response["email"] = result[0]["email"]
                    response["phone"] = result[0]["phone"]
                    response["address"] = result[0]["address"]
                    response["description"] = result[0]["description"]
                    response["logo"] = result[0]["logo"]
                    response["state"] = 200
                    checkState = false
                    res.json(response)
                }
            }
            catch(e){
                let response = {
                    "error":"網路連線錯誤",
                    "state":500
                }
                res.json(response)
            }
        }
        else{
            let response = {
                "error":"查詢不到使用者",
                "state":500
            }
            res.json(response)
        }
        
    }catch(e){
        let response = {
            "error":"查詢不到使用者",
            "state":500
        }
        res.json(response)
    }
    if (checkState){
        let response = {
            "error":"網路連線錯誤",
            "state":500
        }
        res.json(response)
    }
})

router.post('/update', datatype.verifyToken ,async (req, res, next)=> {        
    var userName = req.body.userName;
    var token = req.body.token;
    var userPassword = req.body.userPassword;
    var name = req.body.name;
    var gender = req.body.gender;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var paymentInfo = req.body.paymentInfo;
    var description = req.body.description;
    var logo = req.body.logo;
    var response = {
        "error":"",
        "state":0
    }
    if (paymentInfo != ""){  //customer
        try{
            var customerId = await database.GetUserId(userName)
            console.log(customerId)
            try{
                var sqlUpdateCustomer = `update customer set paymentInfo = "${paymentInfo}" where id = ${customerId};`;
                var result = await database.sqlConnection(sqlUpdateCustomer)
                console.log(result)
                if (result["affectedRows"]!=0){
                    try{
                        var sqlUpdateAccount = `update account set password = "${userPassword}",name = "${name}",gender = "${gender}",email = "${email}",phone = "${phone}",address = "${address}" where id = ${customerId};`;
                        var result = await database.sqlConnection(sqlUpdateAccount)
                        console.log(result)
                        response["state"] = 200
                    } catch(e){
                        console.log(e)
                        response["error"] = "更新account失敗"
                        response["state"] = 500
                    }
                }
                else{
                    response["error"] = "更新customer失敗"
                    response["state"] = 500
                }
                
            } catch(e){
                response["error"] = "更新customer失敗"
                response["state"] = 500
            }
        } catch(e){
            response["error"] = "查無消費者"
            response["state"] = 500
        }
    }
    else { 
        try{
            var businessId = await database.GetUserId(userName)
            console.log(businessId)
            try{
                var sqlUpdateBusiness = `update business set description = "${description}",logo = "${logo}" where id = ${businessId};`;
                var result = await database.sqlConnection(sqlUpdateBusiness)
                console.log(result)
                if (result["affectedRows"]!=0){
                    try{
                        var sqlUpdateAccount = `update account set password = "${userPassword}",name = "${name}",gender = "${gender}",email = "${email}",phone = "${phone}",address = "${address}" where id = ${businessId};`;
                        var result = await database.sqlConnection(sqlUpdateAccount)
                        console.log(result)
                        response["state"] = 200
                    } catch(e){
                        response["error"] = "更新account失敗"
                        response["state"] = 500
                    }
                }
                else{
                    response["error"] = "更新business失敗"
                    response["state"] = 500
                }
            } catch(e){
                response["error"] = "更新business失敗"
                response["state"] = 500
            }
        } catch(e){
            response["error"] = "查無消費者"
            response["state"] = 500
        }
    }
    res.json(response)
})

router.get('/getAllCustomer',async (req, res, next)=> {        
    var response = []
    const sql = `select A.id,A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,C.paymentInfo from account as A,customer as C where A.id = C.id;`
    try{
        var result = await database.sqlConnection(sql)
        console.log(result)
        result.forEach(function(item,index,array){
            var customer = datatype.json2json(item)
            response.push(customer)
        })
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.status(500).send("讀取資料庫失敗")
    }
})

router.get('/getAllBusiness',async (req, res, next)=> {        
    var response = []
    const sql = `select A.id,A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,B.description,B.logo from account as A,business as B where A.id = B.id;`
    try{
        var result = await database.sqlConnection(sql)
        console.log(result)
        result.forEach(function(item,index,array){
            var customer = datatype.json2json(item)
            response.push(customer)
        })
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.status(500).send("讀取資料庫失敗")
    }
})
module.exports = router