# Account

- 註冊帳號時使用
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)account/register/
    - Req
        
        ```json
        {
            "userName":"admin",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "type":"customer"
        }
        ```
        - type的狀態
            1. customer
            2. business
        
    - Res
        - 成功
        
        ```json
        {
            "error":"",
            "state":"200"
        }
        ```
        
        - 失敗
        
        ```json
        {
            "error":"註冊失敗",
            "state":"500"
        }
        ```
        
- 登入帳號時使用
    - POST
    - [http://localhost:5000/account/login](http://localhost:5000/login)/
    - Req
        
        ```json
        {
            "userName":"admin",
            "userPassword": "admin"
        }
        ```
        
    - Res
        - 成功
        
        ```json
        {
            "name":"test",
            "userName":"admin",
            "token":"21312312",
            "error":"",
            "state":"200"
        }
        ```
        
        - 失敗
        
        ```json
        {
            "name":"",
            "userName":"",
            "token":"",
            "error":"登入失敗",
            "state":"500"
        }
        ```
        
- 驗證token是否正確
    - POST
    - [http://localhost:5000/account/login](http://localhost:5000/login)/check
    - Req
        
        ```json
        {
            "token":"dasdawewawewa"
        }
        ```
        
    - Res
        - token正確
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```
        
        - token錯誤
        
        ```json
        {
            "error":"token錯誤",
            "state":500
        }
        ```
        
        - 沒有傳token
        
        ```json
        {
            "error":"沒有提供token",
            "state":500
        }
        ```
        
- 查詢個人狀態
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)account/search
    - Req
        
        ```json
        {
            "userName":"test",
            "token":""
        }
        ```
        
    - Res
        - 如果是customer
        
        ```json
        {
            "userName":"test",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "paymentInfo":"現金",
            "description":"",
            "logo":"",
            "error":"",
            "state":200
        }
        ```
        
        - 如果是business

        ```json
        {
            "userName":"test",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "paymentInfo":"",
            "description":"pchome賣家",
            "logo":"image/1.jpg", //可以是預設的圖片
            "error":"",
            "state":200
        }
        ```

        ```json
        {
            "error":"",
            "state":500
        }
        ```
        
    - paymentInfo的狀態
        1. 現金
        2. 信用卡
- 修改個人狀態
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)account/update
    - Req
        
        ```json
        {
            "userName":"test",    //userName不能修改
            "token":"12312331213231213",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "paymentInfo":"現金",
            "description":"",
            "logo":""
        }
        ```
        ```json
        {
            "userName":"test",    //userName不能修改
            "token":"12312331213231213",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "paymentInfo":"",
            "description":"pchome賣家",
            "logo":"image/1.jpg"
        }
        ```
        
    - Res
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```
        
        ```json
        {
            "error":"修改失敗",
            "state":500
        }
        ```