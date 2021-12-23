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
            }
            else if (type == 'admin'){
                userId = await database.GetAdminId(userName)
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

module.exports = router