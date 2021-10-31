const express = require('express')
const database = require('../database/index')
const router = express.Router()

router.post('/', async (req, res, next)=> {        
    
    var loginData = {
        "userName":req.body.userName,
        "userPassword": req.body.userPassword,
    }
    const sql = `SELECT * FROM customers WHERE name = "${loginData.userName}";`
    console.log(sql)
    var result = {}
    try {
        result = await database.sqlConnection(sql);
    } catch(e){
        console.log(e);
        res.sendStatus(500)
    }
    if (result == ""){
        res.send("無此使用者")
    }
    else{
        var name = result[0].name
        var password = result[0].password
        if (password != loginData.userPassword){
            res.send("密碼錯誤")
        }
        else{
            res.send(`hello ${name}`)
            return;
        }
    }
})

module.exports = router