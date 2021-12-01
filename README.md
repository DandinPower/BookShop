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
    

# login

- 登入帳號時使用
    - POST
    - [http://localhost:5000/login](http://localhost:5000/login)/
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
            "state":"200"
        }
        ```
        
        - 失敗
        
        ```json
        {
            "name":"",
            "userName":"",
            "token":"",
            "state":"500"
        }
        ```

- 驗證token是否正確
    - POST
    - [http://localhost:5000/login](http://localhost:5000/login)/check
    - Req
        
        ```json
        {
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9zZXBoIiwidXNlck5hbWUiOiJkYW5kaW5wb3dlcjEyMyIsImVtYWlsIjoidG9taG90MjQ2QGdtYWlsLmNvbSIsImlhdCI6MTYzODI4OTU4NCwiZXhwIjoxNjM4Mzc1OTg0fQ.T554S5M_JRFSXmnao8O0ctH3l6ktXNj_zRE7zlPd8h4"
        }
        ```
        
    - Res
        - token正確
        
        ```json
        "token 正確"
        ```
        
        - token錯誤
        
        ```json
        "token 錯誤"
        ```
        
        - 沒有傳token
        
        ```json
        "沒有提供token"
        ```
        

## Register

- 註冊帳號時使用
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)register/
    - Req
        
        ```json
        {
            "userName":"admin",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號"
        }
        ```
        
    - Res
        - 成功
        
        ```json
        {
            "state":"200"
        }
        ```
        
        - 失敗
        
        ```json
        {
            "state":"500"
        }
        ```
        

## Product

- 搜尋所有商品分類
    - GET
    - [http://localhost:5000/](http://localhost:5000/login)product/categories/
        
        
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
        
- 根據商品分類
    - GET
    - [http://localhost:5000/](http://localhost:5000/login)product/category/分類名稱
    - Res
        - 分類中有商品
        
        ```json
        [
            {
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
