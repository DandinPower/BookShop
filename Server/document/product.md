# Product

- 透過關鍵詞搜尋商品

  - GET
  - [http://localhost:5000/product/search/關鍵字](http://localhost:5000/product/search/關鍵字)
  - Res
    ```json
    [
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述物理學歷史",
        "name": "你應該擁有的一本牛頓萬有引力",
        "price": 1099,
        "status": "1",
        "category": "物理",
        "image": "dadsadsawadsadsa",
        "uploadedDate": "2021-11-29T16:00:00.000Z"
      },
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述電子學的知識",
        "name": "電子學概論",
        "price": 999,
        "status": "1",
        "category": "電類",
        "image": "adsadswadwdwawdsdsaw",
        "uploadedDate": "2021-11-27T16:00:00.000Z"
      },
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述基本電學的知識",
        "name": "基本電學概論",
        "price": 890,
        "status": "1",
        "category": "電類",
        "image": "awdawdwassadwwasdsaw",
        "uploadedDate": "2021-11-28T16:00:00.000Z"
      }
    ]
    ```

- 搜尋所有商品分類
  - GET
  - [http://localhost:5000/](http://localhost:5000/login)product/categories/
    ```json
    []
    ```
  - Res
    - 有商品時
    ```json
    ["物理", "電類"]
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
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述物理學歷史",
        "name": "你應該擁有的一本牛頓萬有引力",
        "price": 1099,
        "status": "1",
        "category": "物理",
        "image": "dadsadsawadsadsa",
        "uploadedDate": "2021-11-29T16:00:00.000Z"
      },
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述電子學的知識",
        "name": "電子學概論",
        "price": 999,
        "status": "1",
        "category": "電類",
        "image": "adsadswadwdwawdsdsaw",
        "uploadedDate": "2021-11-27T16:00:00.000Z"
      },
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述基本電學的知識",
        "name": "基本電學概論",
        "price": 890,
        "status": "1",
        "category": "電類",
        "image": "awdawdwassadwwasdsaw",
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
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述電子學的知識",
        "name": "電子學概論",
        "price": 999,
        "status": "1",
        "category": "電類",
        "image": "dsadawdwadawdasadsdwdwa",
        "uploadedDate": "2021-11-27T16:00:00.000Z"
      },
      {
        "productId": 1,
        "businessName": "Pchome24H店家",
        "description": "講述基本電學的知識",
        "name": "基本電學概論",
        "price": 890,
        "status": "1",
        "category": "電類",
        "image": "wadwsasdadwwdadsadwwdaadw",
        "uploadedDate": "2021-11-28T16:00:00.000Z"
      }
    ]
    ```
    - 分類中沒有商品
    ```json
    []
    ```
- 根據商品分類取得商品圖片
  - GET
  - [http://localhost:5000/](http://localhost:5000/login)product/image/category/分類名稱
  - Res
    - 分類中有商品
    ```json
    [
      {
        "productId": 1,
        "image": "132231132321oifsvdjwandh2qu2i3j12j3ijwleas"
      },
      {
        "productId": 2,
        "image": "132kdhfyaej93u132iujeaksododkasodoko"
      }
    ]
    ```
    - 分類中沒有商品
    ```json
    []
    ```
- 取得所有商品圖片
  - GET
  - [http://localhost:5000/](http://localhost:5000/login)product/image/all
  - Res
    - 有商品
    ```json
    [
      {
        "productId": 1,
        "image": "132231132321oifsvdjwandh2qu2i3j12j3ijwleas"
      },
      {
        "productId": 2,
        "image": "132kdhfyaej93u132iujeaksododkasodoko"
      },
      {
        "productId": 3,
        "image": "132kdhfyaej93u132iujeadasdsaksododkasodoko"
      }
    ]
    ```
    - 沒有商品
    ```json
    []
    ```
- 根據商品取得商品圖片

  - GET
  - [http://localhost:5000/](http://localhost:5000/login)product/image/產品 ID
  - Res
    - 有商品
    ```json
    {
      "productId": 1,
      "image": "132231132321oifsvdjwandh2qu2i3j12j3ijwleas"
    }
    ```
    - 沒有商品
    ```json
    {
      "productId": 0,
      "image": ""
    }
    ```

- 根據商品取得評論
  - POST
  - [http://localhost:5000/](http://localhost:5000/login)/product/comment
  - Req
    ```json
    {
      "productId": 1
    }
    ```
  - Res
    ```json
    [
      {
        "productId": 1,
        "star": 5,
        "comment": "爛死了",
        "customerName": ""
      },
      {
        "productId": 1,
        "star": 5,
        "comment": "爛死了",
        "customerName": ""
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
        "userName": "test",
        "token": "54d6556f4d5464d65",
        "productId": 2,
        "discount": 0.77,
        "quantity": 1,
        "address": "台南市安平區",
        "paymentInfo": "信用卡" //限定現金,信用卡
      },
      {
        "userName": "test",
        "token": "rcrrc6533434",
        "productId": 3,
        "discount": 0.99,
        "quantity": 1,
        "address": "台南市安平區",
        "paymentInfo": "信用卡" //限定現金,信用卡
      }
    ]
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
    ```json
    {
      "error": "新增失敗",
      "state": 500
    }
    ```
- 查詢訂單

  - POST
  - [http://localhost:5000/](http://localhost:5000/login)product/search
  - Req
    ```json
    {
      "userName": "test",
      "token": "55f85f8756f765f75675"
    }
    ```
  - Res
    ```json
    [
      {
        "price": 999,
        "name": "電子學概論",
        "quantity": 2,
        "discount": 0.77,
        "address": "台南市",
        "paymentInfo": "信用卡", //限定現金,信用卡
        "orderNo": 2,
        "status": "未出貨",
        "orderDate": "2021-11-28T16:00:00.000Z",
        "arrivalDate": "2021-12-28T16:00:00.000Z"
      },
      {
        "price": 999,
        "name": "基本概論",
        "quantity": 2,
        "discount": 0.77,
        "address": "台南市",
        "paymentInfo": "信用卡", //限定現金,信用卡
        "orderNo": 3,
        "status": "未出貨",
        "orderDate": "2021-11-28T16:00:00.000Z",
        "arrivalDate": "2021-12-28T16:00:00.000Z"
      }
    ]
    ```
  - status 的狀態
    1. 未出貨
    2. 出貨
    3. 訂單完成

- 賣家新增商品
  - POST
  - http://localhost:5000/product/manage/add
  - Req
    ```json
    {
      "userName": "test",
      "token": "132315234dads",
      "description": "這是一本好書",
      "name": "戀愛教學",
      "price": 1000,
      "status": "1",
      "category": "教學"
    }
    ```
  - Res
    ```json
    {
      "productId": 0,
      "error": "書名重複",
      "state": 500
    }
    ```
    ```json
    {
      "productId": 8,
      "error": "",
      "state": 200
    }
    ```
- 賣家新增商品圖片

  - POST
  - http://localhost:5000/product/manage/add/image/產品 ID
  - Req
    ```json
    透過formData傳輸圖片
    key為'image'
    ```
  - Res
    ```json
    {
      "error": "已存在圖片",
      "state": 500
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```

- 賣家查詢商品
  - POST
  - http://localhost:5000/product/manage/search
  - Req
    ```json
    {
      "userName": "",
      "token": ""
    }
    ```
  - Res
    ```json
    [
      {
        "productId": "3",
        "description": "說明書籍",
        "name": "無敵主角",
        "price": "999",
        "launch": "1",
        "status": "1",
        "category": "小說",
        "image": "image/1.jpg"
      }
    ]
    ```
- 賣家修改商品
  - POST
  - http://localhost:5000/product/manage/update
  - Req
    ```json
    {
      "userName": "c",
      "token": "321jdiijiqw",
      "productId": "1",
      "description": "說明書籍",
      "name": "新名字",
      "price": "688",
      "status": "0",
      "category": "1",
      "image": "image/32"
    }
    ```
  - Res
    ```json
    {
      "error": "錯誤訊息",
      "state": 500
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
- 賣家修改商品圖片

  - POST
  - http://localhost:5000/product/manage/update/image/產品 ID
  - Req
    ```json
    透過formData傳輸圖片
    key為'image'
    ```
  - Res
    ```json
    {
      "error": "沒有這項商品或圖片不存在",
      "state": 500
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```

- 賣家刪除商品

  - POST
  - http://localhost:5000/product/manage/delete
  - Req
    ```json
    {
      "userName": "c",
      "token": "321jdiijiqw",
      "productId": "1"
    }
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
    ```json
    {
      "error": "錯誤訊息",
      "state": 500
    }
    ```
    - error 種類
      1. 找不到該用戶
      2. 沒有這個 productId
      3. 網路連線錯誤

- 賣家上下架商品
  - POST
  - http://localhost:5000/product/manage/launch
  - Req
    ```json
    {
      "userName": "pname",
      "token": "sadasda",
      "productId": "1",
      "launch": "1"
    }
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
    ```json
    {
      "error": "3122312312",
      "state": 500
    }
    ```
- 賣家查詢訂單
  - POST
  - http://localhost:5000/product/manage/order/search
  - Req
    ```json
    {
      "userName": "",
      "token": ""
    }
    ```
  - Res
    ```json
    [
      {
        "orderNo": "1",
        "orderDate": "2021-11-12",
        "arrivalDate": "null",
        "quantity": "3",
        "status": "未出貨", //訂單的status
        "discount": 0.77,
        "address": "台南市",
        "paymentInfo": "信用卡", //限定現金,信用卡
        "productId": "1",
        "customerId": "3",
        "name": "書籍名稱",
        "price": "333"
      }
    ]
    ```
- 賣家更改訂單狀態
  - POST
  - http://localhost:5000/product/manage/order/status
  - Req
    ```json
    {
      "userName": "username",
      "token": "231231321ssfd",
      "orderNo": "1",
      "status": "已出貨"
    }
    ```
  - Res
    ```json
    {
      "error": "更改失敗",
      "state": 500
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
  - status 狀態
    1. 未出貨
    2. 出貨
    3. 訂單完成
- 買家評論訂單商品
  - POST
  - http://localhost:5000/product/order/comment
  - Req
    ```json
    {
      "userName": "b",
      "token": "23slkadjio123",
      "orderNo": "1",
      "star": 5, //限制1~5
      "comment": "好攢"
    }
    ```
  - Res
    ```json
    {
      "error": "評論失敗",
      "state": 500
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
- 買家申請撤銷訂單
  - POST
  - http://localhost:5000/product/order/cancel
  - Req
    ```json
    {
      "userName": "customer",
      "token": "13213213123",
      "orderNo": 1
    }
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 商品已出貨不能撤銷
      2. 找不到該用戶
      3. 找不到該訂單
      4. 網路連線錯誤
- 賣家處理撤銷請求
  - POST
  - http://localhost:5000/product/order/cancel/confirm
  - Req
    ```json
    {
      "userName": "username",
      "token": "231231321ssfd",
      "orderNo": "1",
      "answer": "Yes" //"Yes" or "No"
    }
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 商品已出貨不能撤銷
      2. 找不到該用戶
      3. 找不到該訂單
      4. 未知的回復
      5. 網路連線錯誤
- 賣家刪除訂單
  - POST
  - http://localhost:5000/product/manage/order/delete
  - Req
    ```json
    {
      "userName": "username",
      "token": "231231321ssfd",
      "orderNo": "1"
    }
    ```
  - Res
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 找不到該用戶
      2. 找不到該訂單
      3. 網路連線錯誤
