const express = require('express')
const database = require('../database/index')
const router = express.Router()

router.post('/', async (req, res, next)=> {        
    var data = req.body
    let _userName = data["userName"]
    let _userPassword = data["userPassword"]
    let _secret = "dsasdawd4312313"
    const sql = `insert into customers (name,password,secret) values ("${_userName}","${_userPassword}","${_secret}");`
    console.log(sql)
    try {
        let result = await database.sqlConnection(sql);
        res.json(result)
    } catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})

module.exports = router