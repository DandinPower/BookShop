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

- 根據商品取得評論
    - POST
    - [http://localhost:5000/](http://localhost:5000/login)/product/comment
    - Req
        ```json
        {
                "productId":1
        }
        ```
    - Res
        ```json
        [
            {
                "productId":1,
                "star":5,
                "comment":"爛死了",
                "customerName":""
            },
            {
                "productId":1,
                "star":5,
                "comment":"爛死了",
                "customerName":""		
            }
        ]
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
                "orderDate":"2021-11-28T16:00:00.000Z",
                "arrivalDate":"2021-12-28T16:00:00.000Z"
            },
            {
                "price":999,
                "name":"基本概論",
                "quantity":2,
                "status":"未出貨",
                "orderDate":"2021-11-28T16:00:00.000Z",
                "arrivalDate":"2021-12-28T16:00:00.000Z"
            }
        ]
        ```
        
    - status的狀態
        1. 未出貨
        2. 出貨
        3. 訂單完成

- 賣家新增商品  
    - POST
    - http://localhost:5000/product/manage/add
    - Req
        
        ```json
        {
            "userName":"test",
            "token":"132315234dads",
            "description":"這是一本好書",
            "name":"戀愛教學",
            "price":1000,
            "status":"1",
            "category":"教學",
            "image":"image/book1.jpg"
        }
        ```
        
    - Res
        
        ```json
        {
            "error":"書名重複",
            "state":500
        }
        ```
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```
        
- 賣家查詢商品
    - POST
    - http://localhost:5000/product/manage/search
    - Req
        
        ```json
        {
            "userName":"",
            "token":""
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "productId":"3",
                "description":"說明書籍",
                "name":"無敵主角",
                "price":"999",
                "launch":true,
                "status":"1",
                "category":"小說",
                "image":"image/1.jpg"
            }
        ]
        ```
        
- 賣家修改商品
    - POST
    - http://localhost:5000/product/manage/update
    - Req
        
        ```json
        {
            "userName":"c",
            "token":"321jdiijiqw",
            "productId":"1",
            "description":"說明書籍",
            "name":"新名字",
            "price":"688",
            "status":"0",
            "category":"1",
            "image":"image/32"
        }
        ```
        
    - Res
        
        ```json
        {
            "error":"錯誤訊息",
            "state":500
        }
        ```
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```
        
- 賣家上下架商品
    - POST
    - http://localhost:5000/product/manage/launch
    - Req
        
        ```json
        {
            "userName":"pname",
            "token":"sadasda",
            "productId":"1",
            "launch":false
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
            "error":"3122312312",
            "state":500
        }
        ```
        
- 賣家查詢訂單
    - POST
    - http://localhost:5000/product/order/manage/search
    - Req
        
        ```json
        {
            "userName":"",
            "token":""
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "orderNo":"1",
                "orderDate":"2021-11-12",
                "arrivalDate":"null",
                "quantity":"3",
                "status":"未出貨",      //訂單的status
                "productId":"1",
                "customerId":"3",
                "name":"書籍名稱",
                "price":"333"
            }
        ]
        ```
        
- 賣家更改訂單狀態
    - POST
    - http://localhost:5000/product/order/manage/status
    - Req
        
        ```json
        {
            "userName":"username",
            "token":"231231321ssfd",
            "orderNo":"1",
            "status":"已出貨"     
        }
        ```
        
    - Res
        
        ```json
        {
            "error":"更改失敗",
            "state":500
        }
        ```
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```
        
    - status狀態
        1. 未出貨
        2. 出貨
        3. 訂單完成
- 買家評論訂單商品 
    - POST
    - http://localhost:5000/product/order/comment
    - Req
        
        ```json
        {
            "userName":"b",
            "token":"23slkadjio123",
            "orderNo":"1",
            "star":5,    //限制1~5
            "comment":"好攢"    
        }
        ```
        
    - Res
        
        ```json
        {
            "error":"評論失敗",
            "state":500
        }
        ```
        
        ```json
        {
            "error":"",
            "state":200
        }
        ```