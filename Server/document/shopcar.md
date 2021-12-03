# ShoppingCar

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
        1. token錯誤
        2. 沒有庫存
        3. 找不到使用者
        4. 查詢失敗

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
            "error":"沒有庫存",
            "state":500
        }
        ```
    - error 的狀態
        1. token錯誤
        2. 沒有庫存
        3. 找不到使用者
        4. 查詢失敗
        5. 購物車沒有這項商品

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