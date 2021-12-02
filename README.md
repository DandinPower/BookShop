# TeamProject

# 使用說明

1. React前端
    - 進入Client/bookstore/的目錄開啟Terminal
2. Express後端
    - 進入Server/的目錄開啟Terminal

# 安裝方法

1. React前端
    
    ```bash
    npm install
    ```
    
2. Express後端
    
    ```bash
    npm install
    ```
    

# 運行伺服器

1. React前端
    
    ```bash
    npm start
    ```
    
2. Express後端
    
    ```bash
    npm run server
    ```
    

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
        

## Product

- 搜尋所有商品分類
    - GET
    - [http://localhost:5000/](http://localhost:5000/login)product/categories/
        
        ```json
        []
        ```
        
    - Res
        - 有商品時
        
        ```json
        [
            "物理",
            "電類"
        ]
        ```
        
        - 沒商品時
        
        ```json
        []
        ```
        
- 取得所有商品資訊
    - GET
    - [http://localhost:5000/](http://localhost:5000/login)product/all
    - Res
        - 資料庫有商品
        
        ```json
        [
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "description": "講述物理學歷史",
                "name": "你應該擁有的一本牛頓萬有引力",
                "price": 1099,
                "status": "1",
                "category": "物理",
                "image": "image/product/picture2.jpg",
                "uploadedDate": "2021-11-29T16:00:00.000Z"
            },
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "description": "講述電子學的知識",
                "name": "電子學概論",
                "price": 999,
                "status": "1",
                "category": "電類",
                "image": "image/product/picture3.jpg",
                "uploadedDate": "2021-11-27T16:00:00.000Z"
            },
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "description": "講述基本電學的知識",
                "name": "基本電學概論",
                "price": 890,
                "status": "1",
                "category": "電類",
                "image": "image/product/picture1.jpg",
                "uploadedDate": "2021-11-28T16:00:00.000Z"
            }
        ]
        ```
        
        - 資料庫沒有商品
        
        ```json
        []
        ```
        
- 根據商品分類取得商品資訊
    - GET
    - [http://localhost:5000/](http://localhost:5000/login)product/category/分類名稱
    - Res
        - 分類中有商品
        
        ```json
        [
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "description": "講述電子學的知識",
                "name": "電子學概論",
                "price": 999,
                "status": "1",
                "category": "電類",
                "image": "image/product/picture3.jpg",
                "uploadedDate": "2021-11-27T16:00:00.000Z"
            },
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "description": "講述基本電學的知識",
                "name": "基本電學概論",
                "price": 890,
                "status": "1",
                "category": "電類",
                "image": "image/product/picture1.jpg",
                "uploadedDate": "2021-11-28T16:00:00.000Z"
            }
        ]
        ```
        
        - 分類中沒有商品
        
        ```json
        []
        ```
        
- 下訂單
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)product/add
    - Req
        
        ```json
        [
            {
                "userName":"test",
                "token":"54d6556f4d5464d65",
                "productId":2,
                "quantity":1
            },
            {
                "userName":"test",
                "token":"rcrrc6533434",
                "productId":3,
                "quantity":1
            }
        ]
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
            "error":"新增失敗",
            "state":500
        }
        ```
        
- 查詢訂單
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)product/search
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"55f85f8756f765f75675"
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "price":999,
                "name":"電子學概論",
                "quantity":2,
                "status":"未出貨",
                "orderdate":"2021-11-28T16:00:00.000Z",
                "arrivaldate":"2021-12-28T16:00:00.000Z"
            },
            {
                "price":999,
                "name":"基本概論",
                "quantity":2,
                "status":"未出貨",
                "orderdate":"2021-11-28T16:00:00.000Z",
                "arrivaldate":"2021-12-28T16:00:00.000Z"
            }
        ]
        ```
        
    - status的狀態
        1. 未出貨
        2. 出貨
        3. 訂單完成

# Shopping Car

- 把商品加到購物車
    - POST
    - http://localhost:5000/shopcar/add
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"vttvtytvyttyyttyytyt",
            "productId":2
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
            "error":"沒有庫存",
            "state":500
        }
        ```
        
    - error 的狀態
        1. 沒有庫存
        2. 找不到商品
- 更改商品數量
    - POST
    - http://localhost:5000/shopcar/update
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"",
            "productId":2,
            "quantity":2
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
            "error":"沒有庫存"
            "state":500
        }
        ```
        
- 查詢購物車狀態
    - POST
    - http://localhost:5000/shopcar/all
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"kljjkllkjlkjjllkjiiijlilk"
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "productId":1,
                "businessName": "Pchome24H店家",
                "name": "電子學概論",
                "price": 999,
                "image": "image/product/picture3.jpg",
                "quantity":2
            }
        ]
        ```
        
- 個別刪除
    - POST
    - http://localhost:5000/shopcar/delete
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"klkjlljjlkjlkkljjkljklkjlklj",
            "productId":2
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
            "error":"沒有此項在購物車",
            "state":500
        }
        ```
        
- 整批刪除
    - POST
    - http://localhost:5000/shopcar/deleteall
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"iojioijjiooijijoijijo"
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
            "error":"沒有此項在購物車",
            "state":500
        }
        ```
