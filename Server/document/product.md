# Product

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