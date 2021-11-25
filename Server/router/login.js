const express = require('express')
const database = require('../database/index')
const router = express.Router()

router.post('/', async (req, res, next)=> {        
    
    var loginData = {
        "userName":req.body.userName,
        "userPassword": req.body.userPassword,
    }
    const sql = `SELECT * FROM account WHERE userName = "${loginData.userName}";`
    console.log(sql)
    var response = {
        "name":"",
        "token":"",
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
        console.log(result)
        var token = "testToken"
        if (password != loginData.userPassword){
            response["state"] = "500"
            res.json(response)
        }
        else{
            response["name"] = name
            response["token"] = token
            response["state"] = "200"
            res.json(response)
        }
    }
})

module.exports = router