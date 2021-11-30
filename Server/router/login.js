const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const router = express.Router()

function verifyToken(req,res,next){
    let token = req.body.token || req.query.token;
    console.log("verify Token" , token);
    if (token) {
        jwt.verify(token, 'ThisIsSecurityMix@TPE&4255',(err,decoded)=>{
          if (err) {
            return res.status(500).send('token認證錯誤')
          } else {
            req.decoded = decoded;
            next();
          }
        })
      } else {
        return res.status(403).send('沒有提供token')
      }
  }

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
        let setToken = {
            name : result[0].name,
            userName : result[0].userName,
            email : result[0].email
          }
        let token = jwt.sign(
            JSON.parse(JSON.stringify(setToken)), 
            'ThisIsSecurityMix@TPE&4255',
            {expiresIn: 60*60*24}
          )
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

router.post('/check',verifyToken,(req, res)=> {
    console.log('hi')
    res.send('token 正確')
})

module.exports = router