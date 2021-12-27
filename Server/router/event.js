const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const datatype = require('../function/datatype')
const file = require('../function/file')
const router = express.Router()

router.post('/add', datatype.verifyToken, async(req,res,next)=>{
    var type = req.body.type 
    var userName = req.body.userName
    var name = req.body.name
    var discount = req.body.discount
    var date = req.body.date
    var _date = new Date(date) 
    var currentDate = Date.now()
    var state = true
    var response = {
        "error":"",
        "state":0
    }
    if (type != 'business' & type != 'admin'){
        response["error"] = "不是business或admin"
        response["state"] = 500
        state = false
    }
    if (name == ''){
        response["error"] = "活動名不符合限制"
        response["state"] = 500
        state = false
    }
    if (discount <= 0 | discount > 1){
        response["error"] = "折扣不符合限制"
        response["state"] = 500
        state = false
    }
    if(_date < currentDate){
        response["error"] = "到期日不符合限制"
        response["state"] = 500
        state = false
    }
    if (state){
        var userId = 0
        var sqlUpdate = ``
        try{
            if (type == 'business'){
                userId = await database.GetUserId(userName)
                if (userId == null){
                    let response = {
                        "error":"找不到該用戶",
                        "state":500
                    }
                    res.json(response)
                }
            }
            else if (type == 'admin'){
                userId = await database.GetAdminId(userName)
                if (userId != null){
                    var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                    if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event'){
                        let response = {
                            "error":"管理員沒有該權限",
                            "state":500
                        }
                        res.json(response)
                    }
                }
                else{
                    let response = {
                        "error":"找不到該用戶",
                        "state":500
                    }
                    res.json(response)
                }
            }
            console.log(userId)
            try{
                var organizerId = await database.GetOrganizerId(type,userId)
                console.log(organizerId)
                if (organizerId != null){
                    try{
                        var insertResult = await database.sqlConnection(`insert into event(organizerId,name,discount,date)value(${organizerId},"${name}",${discount},"${date}");`)
                        console.log(insertResult)
                        response["state"] = 200
                    }catch(e){
                        response["error"] = "活動名不符合限制"
                        response["state"] = 500
                        state = false
                        console.log(e)
                    }
                }
                else{
                    response["error"] = "網路連線錯誤"
                    response["state"] = 500
                    state = false
                }
            }catch(e){
                response["error"] = "網路連線錯誤"
                response["state"] = 500
                state = false
                console.log(e)
            }
        }catch(e){
            response["error"] = "網路連線錯誤"
            response["state"] = 500
            state = false
            console.log(e)
        }  
    }
    res.json(response)
})

router.post('/search', datatype.verifyToken, async(req,res,next)=>{
    var type = req.body.type 
    var userName = req.body.userName
    if (type == 'business'){
        try{
            var userId = await database.GetUserId(userName)
            if (userId == null){
                let response = {
                    "error":"找不到該用戶",
                    "state":500
                }
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"網路連線失敗",
                "state":500
            }
            res.json(response)
        }
    }
    else if (type == 'admin'){
        try{
            var userId = await database.GetAdminId(userName)
            if (userId != null){
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event'){
                    let response = {
                        "error":"管理員沒有該權限",
                        "state":500
                    }
                    res.json(response)
                }
            }
            else{
                let response = {
                    "error":"找不到該用戶",
                    "state":500
                }
                res.json(response)
            }
            
        }catch(e){
            let response = {
                "error":"網路連線失敗",
                "state":500
            }
            res.json(response)
        }  
    }
    else{
        
        let response = {
            "error":"不是business或admin",
            "state":500
        }
        res.json(response)
    }
    try{
        var organizerId = await database.GetOrganizerId(type,userId)
        try{
            var result = await database.sqlConnection(`select * from event where organizerId = ${organizerId}`)
            var response = []
            result.forEach(function(item, index, array) {
                let event = datatype.json2json(item)
                console.log(event)
                response.push(event)
            });
            res.json(response)
        }catch(e){
            console.log(e)
            let response = {
                "error":"網路連線失敗",
                "state":500
            }
            res.json(response)
    
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"網路連線失敗",
            "state":500
        }
        res.json(response)
    }
})

router.post('/update', datatype.verifyToken, async(req,res,next)=>{
    var type = req.body.type 
    var userName = req.body.userName
    if (type == 'business'){
        try{
            var userId = await database.GetUserId(userName)
            if (userId == null){
                let response = {
                    "error":"找不到該用戶",
                    "state":500
                }
                res.json(response)
            }
        }catch(e){
            console.log(e)
            let response = {
                "error":"網路連線失敗",
                "state":500
            }
            res.json(response)
        }
    }
    else if (type == 'admin'){
        try{
            var userId = await database.GetAdminId(userName)
            if (userId != null){
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event'){
                    let response = {
                        "error":"管理員沒有該權限",
                        "state":500
                    }
                    res.json(response)
                }
            }
            else{
                let response = {
                    "error":"找不到該用戶",
                    "state":500
                }
                res.json(response)
            }
            
        }catch(e){
            let response = {
                "error":"網路連線失敗",
                "state":500
            }
            res.json(response)
        }  
    }
    else{
        
        let response = {
            "error":"不是business或admin",
            "state":500
        }
        res.json(response)
    }
    var name = req.body.name 
    var discount = req.body.discount
    var date = req.body.date
    var _date = new Date(date) 
    var currentDate = Date.now()
    if (discount <= 0 | discount > 1){
        let response = {
            "error":"折扣不符合限制",
            "state":500
        }
        res.json(response)
    }
    if(_date < currentDate){
        let response = {
            "error":"到期日不符合限制",
            "state":500
        }
        res.json(response)
    }
    try{
        var organizerId = await database.GetOrganizerId(type,userId)
        console.log(organizerId)
        if (organizerId != null){
            const sql = `update event set discount = ${discount},date = "${date}" where organizerId = ${organizerId} and name = "${name}";`
            console.log(sql)
            try{
                var result = await database.sqlConnection(sql)
                if (result["affectedRows"] != 0){
                    let response = {
                        "error":"",
                        "state":200
                    }
                    res.json(response)
                }
                else{
                    let response = {
                        "error":"找不到該活動",
                        "state":500
                    }
                    res.json(response)
                }
            }catch(e){
                let response = {
                    "error":"網路連線失敗",
                    "state":500
                }
                res.json(response)
            }
        }
        else{
            let response = {
                "error":"找不到該活動",
                "state":500
            }
            res.json(response)
        }
    }catch(e){
        console.log(e)
        let response = {
            "error":"網路連線失敗",
            "state":500
        }
        res.json(response)
    }
})

module.exports = router