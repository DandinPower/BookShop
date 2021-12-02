const jwt = require('jsonwebtoken')

function json2json(json){
    var result = {};
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result[key] = (json[key]);
    });
    return result;
}
function verifyToken(req,res,next){
    let token = req.body.token || req.query.token;
    console.log("verify Token" , token);
    if (token) {
        jwt.verify(token, 'ThisIsSecurityMix@TPE&4255',(err,decoded)=>{
          if (err) {
            return res.status(500).send('token 錯誤')
          } else {
            req.decoded = decoded;
            next();
          }
        })
      } else {
        return res.status(403).send('沒有提供token')
      }
  }


function getUser() {
    // Code here
}

function getUsers() {
    // Code here
}

module.exports = {
    getUser,
    getUsers,
    json2json,
    verifyToken
}