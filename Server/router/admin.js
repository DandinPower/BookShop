const e = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const datatype = require('../function/datatype')
const file = require('../function/file')
const router = express.Router()

router.post('/login', async (req, res, next)=> {        
    var userName = req.body.userName
    var userPassword = req.body.userPassword
    try{
        var adminId = await database.GetAdminId(userName)
        const sqlSearch = `select userName,password,authority from admin where id = ${adminId};`
        try{
            var result = await database.sqlConnection(sqlSearch)
            console.log(result)
            if (result.length != 0){
                if (result[0].password == userPassword){  
                    let setToken = {
                        userName : result[0].userName
                    }
                    let token = jwt.sign(
                        JSON.parse(JSON.stringify(setToken)), 
                        'ThisIsSecurityMix@TPE&4255',
                        {expiresIn: 60*6*24}
                    )
                    let response = {
                        "token":"",
                        "authority":""
                    }
                    response["token"] = token 
                    response["authority"] = result[0].authority 
                    res.json(response)
                }
                else {
                    let response = {
                        "error":"",
                        "state":0
                    }
                    response["error"] = "找不到該用戶或密碼錯誤"
                    response["state"] = "500"
                    res.json(response)
                }
            }
            else {
                let response = {
                    "error":"",
                    "state":0
                }
                response["error"] = "找不到該用戶或密碼錯誤"
                response["state"] = "500"
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"",
                "state":0
            }
            response["error"] = "網路連線錯誤"
            response["state"] = "500"
            res.json(response)
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"",
            "state":0
        }
        response["error"] = "網路連線錯誤"
        response["state"] = "500"
        res.json(response)
    }
})

router.post('/business/search',datatype.verifyToken, async (req,res,next)=>{
    var userName = req.body.userName
    try{
        var adminId = await database.GetAdminId(userName)
        console.log(adminId)
        try{
            var sqlCheck = `select authority from admin where id = ${adminId}`
            var result = await database.sqlConnection(sqlCheck)
            console.log(result)
            if (result.length != 0){
                if (result[0].authority == 'account' | result[0].authority == 'all' ){
                    var sqlSearch = `select B.id,A.name,A.phone,A.email,A.address,A.enable from business as B join account as A on  A.id = B.id;`;
                    console.log(sqlSearch)
                    try{
                        var searchResult = await database.sqlConnection(sqlSearch)
                        console.log(searchResult)
                        let response = []
                        searchResult.forEach(function(item, index, array) {
                            let account = datatype.json2json(item)
                            response.push(account)
                          });
                        res.json(response)
                    }catch(e){
                        console.log(e)
                        let response = {
                            "error":"",
                            "state":0
                        }
                        response["error"] = "網路連線錯誤"
                        response["state"] = "500"
                        res.json(response)
                    }
                }
                else{
                    let response = {
                        "error":"",
                        "state":0
                    }
                    response["error"] = "管理員沒有該權限"
                    response["state"] = "500"
                    res.json(response)
                }
            }
            else{
                let response = {
                    "error":"",
                    "state":0
                }
                response["error"] = "找不到該用戶"
                response["state"] = "500"
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"",
                "state":0
            }
            response["error"] = "網路連線錯誤"
            response["state"] = "500"
            res.json(response)
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"",
            "state":0
        }
        response["error"] = "網路連線錯誤"
        response["state"] = "500"
        res.json(response)
    }
    
    
    

})

router.post('/customer/search',datatype.verifyToken, async (req,res,next)=>{
    var userName = req.body.userName
    try{
        var adminId = await database.GetAdminId(userName)
        console.log(adminId)
        try{
            var sqlCheck = `select authority from admin where id = ${adminId}`
            var result = await database.sqlConnection(sqlCheck)
            console.log(result)
            if (result.length != 0){
                if (result[0].authority == 'account' | result[0].authority == 'all' ){
                    var sqlSearch = `select C.id,A.name,A.phone,A.email,A.address,A.enable from customer as C join account as A on  A.id = C.id;`;
                    console.log(sqlSearch)
                    try{
                        var searchResult = await database.sqlConnection(sqlSearch)
                        console.log(searchResult)
                        let response = []
                        searchResult.forEach(function(item, index, array) {
                            let account = datatype.json2json(item)
                            response.push(account)
                          });
                        res.json(response)
                    }catch(e){
                        console.log(e)
                        let response = {
                            "error":"",
                            "state":0
                        }
                        response["error"] = "網路連線錯誤"
                        response["state"] = "500"
                        res.json(response)
                    }
                }
                else{
                    let response = {
                        "error":"",
                        "state":0
                    }
                    response["error"] = "管理員沒有該權限"
                    response["state"] = "500"
                    res.json(response)
                }
            }
            else{
                let response = {
                    "error":"",
                    "state":0
                }
                response["error"] = "找不到該用戶"
                response["state"] = "500"
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"",
                "state":0
            }
            response["error"] = "網路連線錯誤"
            response["state"] = "500"
            res.json(response)
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"",
            "state":0
        }
        response["error"] = "網路連線錯誤"
        response["state"] = "500"
        res.json(response)
    }
    
    
    

})

router.post('/account/update',datatype.verifyToken, async (req,res,next)=>{
    var userName = req.body.userName
    var enable = req.body.enable
    var id = req.body.id
    console.log(result)
    try{
        var adminId = await database.GetAdminId(userName)
        console.log(adminId)
        var sqlCheck = `select authority from admin where id = ${adminId}`
        try {
            var result = await database.sqlConnection(sqlCheck)
            console.log(result)
            if (result.length != 0){
                if (result[0].authority == 'account' | result[0].authority == 'all' ){
                    if (enable == "0" | enable == "1"){
                        try{
                            const sqlUpdate = `update account set enable = "${enable}" where id = ${id};`
                            var updateResult = await database.sqlConnection(sqlUpdate)
                            console.log(updateResult)
                            if (updateResult["affectedRows"] != 0){
                                let response = {
                                    "error":"",
                                    "state":200
                                }
                                res.json(response)
                            }
                            else{
                                let response = {
                                    "error":"",
                                    "state":500
                                }
                                response["error"] = "找不到待修改的帳戶"
                                res.json(response)
                            }
                        }catch(e){
                            console.log(e)
                            let response = {
                                "error":"",
                                "state":500
                            }
                            response["error"] = "網路連線錯誤"
                            res.json(response)
                        }
                    }    
                    else{
                        let response = {
                            "error":"",
                            "state":500
                        }
                        response["error"] = "Enable不符合限制"
                        res.json(response)
                    }        
                }else{
                    let response = {
                        "error":"",
                        "state":500
                    }
                    response["error"] = "管理員沒有該權限"
                    res.json(response)
                }
            }else{
                let response = {
                    "error":"",
                    "state":500
                }
                response["error"] = "找不到該用戶"
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"",
                "state":500
            }
            response["error"] = "網路連線錯誤"
            res.json(response)
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"",
            "state":500
        }
        response["error"] = "網路連線錯誤"
        res.json(response)
    }
    
})

module.exports = router