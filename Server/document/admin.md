# Admin

- 管理員登入
    - POST
    - http://localhost:5000/admin/login
    - Req
        
        ```json
        {
            "userName":"admin1",
            "userPassword":"123"
        }
        ```
        
    - Res
        
        ```json
        {
            "token":"23321ssads",
            "authority":"account"  //分account,event,all
        }
        ```
        
        ```json
        {
            "error":"",
            "state":500
        }
        ```
        
        - error的種類
            1. 找不到該用戶或密碼錯誤
            2. 網路連線錯誤
- 管理員查看廠商權限
    - POST
    - [http://localhost:5000/admin/business/search](http://localhost:5000/admin/business/search)
    - Req
        
        ```json
        {
            "userName":"admin1",
            "token":"2j1idnau23j123"
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "businessId":1,
                "businessName":"kevin",
                "phone":"0912345673",
                "email":"tom@gmail.com",
                "address":"157號",
                "enable":"1"
            }
        ]
        ```
        
        ```json
        {
            "error":"",
            "state":500
        }
        ```
        
        - error的種類
            1. 找不到該用戶
            2. 管理員沒有該權限
            3. 網路連線錯誤
- 管理員查看顧客權限
    - POST
    - http:localhost:5000/admin/customer/search
    - Req
        
        ```json
        {
            "userName":"admin1",
            "token":"1j2i3jdijasd"
        }
        ```
        
    - Res
        
        ```json
        [
            {
                "customerId":1,
                "customerName":"cus1",
                "phone":"0987654321",
                "email":"tom123@gmail,com",
                "address":"景平路150號",
                "enable":"1"
            }
        ]
        ```
        
        ```json
        {
            "error":"",
            "state":500
        }
        ```
        
        - error的種類
            1. 找不到該用戶
            2. 管理員沒有該權限
            3. 網路連線錯誤
- 管理員修改帳戶權限
    - POST
    - [http://localhost:5000/admin/account/update](http://localhost:5000/admin/account/update)
    - Req
        
        ```json
        {
            "userName":"admin1",
            "token":"jaidjijdi2j1i321",
            "id":1,
            "enable":"0"  //不能為0或1以外的
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
            "error":"",
            "state":500
        }
        ```
        
        - error的種類
            1. 找不到該用戶
            2. 管理員沒有該權限
            3. 找不到待修改的帳戶
            4. Enable不符合限制
            5. 網路連線錯誤