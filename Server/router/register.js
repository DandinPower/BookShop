const express = require('express')
const database = require('../database/index')
const router = express.Router()

router.post('/', async (req, res, next)=> {        
    var data = req.body
    let _userName = data["userName"]
    let _userPassword = data["userPassword"]
    let _name = data["name"]
    let _gender = data["gender"]
    let _email = data["email"]
    let _phone = data["phone"]
    let _address = data["address"]
    const sql = `insert into account (address,gender,phone,email,password,userName,name) values ("${_address}","${_gender}","${_phone}","${_email}","${_userPassword}","${_userName}","${_name}");`
    console.log(sql)
    var response = {
        "state":""
    }
    try {
        let result = await database.sqlConnection(sql);
        response["state"] = "200";
        console.log(result)
    } catch(e){
        response["state"] = "500";
        console.log(e)
    }
    res.json(response)
})

module.exports = router