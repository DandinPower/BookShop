const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const datatype = require('../function/datatype')
const router = express.Router()



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
    const sql = `insert into account (address,gender,phone,email,password,userName,name) values ("${_address}","${_gender}","${_phone}","${_email}","${_userPassword}","${_userName}","${_name}");`
    var sql2 = ``;
    console.log(sql)
    if (_type == "customer"){
        sql2 = `insert into customer (id) value ((SELECT LAST_INSERT_ID()));`;
    }
    else if (_type == "business"){
        sql2 = `insert into business (id) value ((SELECT LAST_INSERT_ID()));`;
    }
    var response = {
        "error":"",
        "state":""
    }
    try {
        let result = await database.sqlConnection(sql);
        response["state"] = "200";
        console.log(result)
        try {
            let result = await database.sqlConnection(sql2);
            response["state"] = "200";
            console.log(result)
        } catch(e){
            response["error"] = "註冊失敗"
            response["state"] = "500"
            console.log(e)
        }
    } catch(e){
        response["error"] = "註冊失敗"
        response["state"] = "500"
        console.log(e)
    }
    res.json(response)
})

router.post('/login', async (req, res, next)=> {        
    
    var loginData = {
        "userName":req.body.userName,
        "userPassword": req.body.userPassword,
    }
    const sql = `SELECT * FROM account WHERE userName = "${loginData.userName}";`
    console.log(sql)
    var response = {
        "name":"",
        "userName":"",
        "token":"",
        "error":"",
        "state":""
    }
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
    } catch(e){
        console.log(e);
    }
    if (result == ""){
        response["state"] = "500"
        res.json(response)
    }
    else{
        var name = result[0].name
        var password = result[0].password
        var userName = result[0].userName
        console.log(result)
        let setToken = {
            name : result[0].name,
            userName : result[0].userName,
            email : result[0].email
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
            response["name"] = name
            response["userName"] = userName
            response["token"] = token
            response["state"] = "200"
            res.json(response)
        }
    }
})

router.post('/login/check',datatype.verifyToken,(req, res)=> {
    res.json({
        "error":"",
        "state":200
    })
})


router.post('/search', datatype.verifyToken,async (req, res, next)=> {        
    var userName = req.body.userName;
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

router.post('/update', async (req, res, next)=> {        
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