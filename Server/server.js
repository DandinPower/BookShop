const express = require('express')   //導入框架
const cors = require('cors')
const app = express()  //宣告框架變數
const port = 5000  //定義本地伺服端port 
const login = require('./router/login')
const index = require('./router/index')
const register = require('./router/register')
const product = require('./router/product')

console.log('測試')

app.use(express.json())
app.use(cors())
app.use('',index)
app.use('/login',login)
app.use('/register',register)
app.use('/product',product)

app.listen(port,()=>{        //伺服器運行的Function
    console.log(`Server listening at http://localhost:${port}`)  //運作提示字樣
})