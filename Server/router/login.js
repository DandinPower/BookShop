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
        res.json(result)
    } catch(e){
        console.log(e);
        res.sendStatus(500)
    }
    console.log(result)

})

module.exports = router