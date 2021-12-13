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
    let token = req.body.token || req.query.token || req["token"];
    console.log("verify Token" , token);
    if (token) {
        jwt.verify(token, 'ThisIsSecurityMix@TPE&4255',(err,decoded)=>{
          if (err) {
            return res.status(500).json({
              "error":"token錯誤",
              "state":500
          })
          } else {
            req.decoded = decoded;
            next();
          }
        })
      } else {
        return res.json({
          "error":"沒有提供token",
          "state":500
      })
      }
}

function verifyTokenByList(req,res,next){
  var check = false
  reqList = req.body 
  reqList.every(async(request,response,array) =>{
    let token = request["token"]
    console.log("verify Token" , token);
    if (token) {
        jwt.verify(token, 'ThisIsSecurityMix@TPE&4255',(err,decoded)=>{
          if (err) {
            check = false
            return false
          } else {
            check = true 
            return true 
          }
        })
      } else {
        check = false
        return false
      }
  })
  if (check){
    next()
  }
  else{
    res.json({
      "error":"token錯誤",
      "state":500
    })
  }
}

module.exports = {
    json2json,
    verifyToken,
    verifyTokenByList
}