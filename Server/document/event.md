# Event

- 賣家或管理員上架活動
  - POST
  - http://localhost:5000/event/add
  - Req
    ```json
    {
      "type": "business", //只能為business或admin
      "userName": "hsfdhuhuhuhd",
      "token": "123uihdhwauh213y72h23u1hh388h2`hu12`",
      "name": "88折", //同一個廠商或管理員不能重複,不能空白
      "date": "2021-12-25" //不能小於現在
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
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限 //authority 要為 event
      3. 找不到該用戶
      4. 活動名不符合限制
      5. 到期日不符合限制
      6. 網路連線失敗
- 賣家或管理員查詢活動
  - POST
  - [http://localhost:5000/event/search](http://localhost:5000/event/business/search)
  - Req
    ```json
    {
      "type": "business", //只能為business或admin
      "userName": "business1",
      "token": "312ijh318j83j2hu312u31hu"
    }
    ```
    ```json
    [
      {
        "organizerId": 1,
        "name": "全站88折",
        "date": "2021-12-25"
      },
      {
        "organizerId": 3,
        "name": "全站98折",
        "date": "2021-12-25"
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限 //authority 要為 event
      3. 找不到該用戶
      4. 網路連線失敗
- 賣家或管理員修改活動
  - POST
  - http:localhost:5000/event/update
  - Req
    ```json
    {
      "type": "business", //只能為business或admin
      "userName": "",
      "token": "213dasdawewew232132123gsdfs",
      "name": "全站77", //不能修改僅拿來查找
      "date": "2021-12-25" //不能早於現在
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
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該活動
      5. 到期日不符合限制
      6. 網路連線失敗
- 賣家或管理員刪除活動
  - POST
  - [http://localhost:5000/event/delete](http://localhost:5000/event/delete/)
  - Req
    ```json
    {
      "type": "business", //要是business或admin
      "userName": "kevin",
      "token": "jiadjdijqduncndasvnj",
      "name": "全站88"
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
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該活動
      5. 網路連線失敗
- 賣家或管理員新增優惠券
  - POST
  - http://localhost:5000/event/coupon/add
  - Req
    ```json
    {
      "type": "business", //只能為business或admin
      "userName": "business1",
      "token": "213131sdadsD",
      "name": "全站88",
      "code": "32DE", //不得超過10碼或空白 同一個活動不得重複
      "date": "2021-12-25", //不得早於現在或晚於活動到期日
      "discount": 0.88, //0<discount<=1
      "maxQuantity": 2, //不得為0
      "description": "21312312321"
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
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該活動
      5. 優惠碼不符合限制
      6. 優惠碼重複
      7. 折扣不符合限制
      8. 到期日不符合限制
      9. 最大數量不符合限制
      10. 網路連線失敗
- 賣家或管理員查詢擁有的優惠券
  - POST
  - http://localhost:5000/event/coupon/search
  - Req
    ```json
    {
      "type": "admin", //只能為admin或business
      "userName": "business1",
      "token": "213131sdadsD"
    }
    ```
  - Res
    ```json
    [
      {
        "code": "32DE",
        "date": "2021-12-25",
        "discount": 0.88,
        "maxQuantity": 2,
        "description": "12313123123",
        "name": "全站88"
      },
      {
        "code": "32DEA",
        "date": "2021-12-25",
        "discount": 0.88,
        "maxQuantity": 1,
        "description": "12313123123",
        "name": "全站88"
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該活動
      5. 網路連線失敗
- 賣家或管理員修改優惠券
  - POST
  - http://localhost:5000/event/coupon/update
  - Req
    ```json
    {
      "type": "admin", //只能為business或admin
      "userName": "business1",
      "token": "13ji2jinfdadus87",
      "code": "32DE", //不得修改僅拿來尋找該優惠券
      "date": "2021-12-25", //不得早於現在或晚於活動到期日
      "discount": 0.88, //0<discount<=1
      "maxQuantity": 3, //不得為0
      "description": "12313123123"
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
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該優惠券
      5. 到期日不符合限制
      6. 折扣不符合限制
      7. 最大數量不符合限制
      8. 網路連線失敗
- 賣家或管理員刪除優惠券
  - POST
  - http://localhost:5000/event/coupon/delete
  - Req
    ```json
    {
      "type": "admin", //只能為business或admin
      "userName": "banana",
      "token": "231dijijj2ji13",
      "code": "HAPPY69"
    }
    ```
    ```json
    {
      "error": "",
      "state": 200
    }
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 不是 business 或 admin
      2. 管理員沒有該權限
      3. 找不到該用戶
      4. 找不到該優惠券
      5. 網路連線失敗
- 買家查詢活動
  - GET
  - [http://localhost:5000/event/all](http://localhost:5000/event/all)
  - Res
    ```json
    [
      {
        "organizerId": 1,
        "organizerName": "busin123", //businessName或者是"管理員"
        "name": "全網88",
        "date": "2021-12-25"
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 網路連線失敗
- 買家根據活動查詢優惠券
  - POST
  - [http://localhost:5000/event/](http://localhost:5000/event/all)coupon/customer/search
  - Req
    ```json
    {
      "name": "全站88"
    }
    ```
  - Res
    ```json
    [
      {
        "code": "HAPPY68",
        "name": "全網88", //活動名稱
        "discount": 0.88,
        "date": "2021-12-25",
        "maxQuantity": 3,
        "description": "2132131ssdasda"
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 種類
      1. 找不到該活動
      2. 網路連線失敗
- 買家領取優惠券
  - POST
  - http://localhost:5000/event/coupon/customer/receive
  - Req
    ```json
    {
      "userName": "customer1",
      "token": "hudh17h21h321uuu8312",
      "code": "HAPPY69"
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
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 找不到該用戶
      2. 找不到該優惠券
      3. 已領取過該優惠券
      4. 網路連線失敗
- 買家查詢該商品能使用的優惠券

  - POST
  - http://localhost:5000/event/coupon/customer/product
  - Req

    ```json
    {
      "userName": "customer1",
      "token": "hudh17h21h321uuu8312",
      "productId": 1
    }
    ```

  - Res
    ```json
    [
      {
        "code": "SEX69",
        "discount": 0.66,
        "date": "2021-12-25",
        "quantity": 2
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 找不到該產品
      2. 網路連線失敗

- 買家查詢擁有的優惠券

  - POST
  - [http://localhost:5000/event/coupon/customer/](http://localhost:5000/event/coupon/use)have
  - Req
    ```json
    {
      "userName": "customer1",
      "token": "123132sadaswwa"
    }
    ```
  - Res
    ```json
    [
      {
        "code": "SEX69",
        "discount": 0.66,
        "date": "2021-12-25",
        "quantity": 2
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 網路連線失敗

- 買家使用優惠券

  - POST
  - [http://localhost:5000/event/coupon/customer/use](http://localhost:5000/event/coupon/customer/use)
  - Req
    ```json
    {
      "userName": "customer1",
      "token": "123132sadaswwa",
      "code": "SEX69"
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
      2. 找不到該優惠券
      3. 未領取該優惠券
      4. 該優惠券已使用完畢
      5. 網路連線失敗

- 買家查詢全站能用的優惠券
  - POST
  - http://localhost:5000/event/coupon/customer/all
  - Req
    ```json
    {
      "userName": "customer1",
      "userPassword": "123"
    }
    ```
  - Res
    ```json
    [
      {
        "code": "SEX69",
        "discount": 0.66,
        "date": "2021-12-25",
        "quantity": 2
      }
    ]
    ```
    ```json
    {
      "error": "",
      "state": 500
    }
    ```
    - error 的種類
      1. 網路連線失敗
