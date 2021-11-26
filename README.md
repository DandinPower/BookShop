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

### API

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
    	"token":"21312312",
    	"state":"200"
    }
    ```
    
    - 失敗
    
    ```json
    {
    	"name":"",
    	"token":"",
    	"state":"500"
    }
    ```
    

## Register

### API

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
