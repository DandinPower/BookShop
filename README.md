# TeamProject

# 安裝指南

- 進入Server的目錄開啟Terminal

```bash
npm install
```

# 運行伺服器

```bash
npm run server
```

# API

## Login登入

- POST請求
- 地址為 localhost:5000/login

```json
{
    "userName":"admin",
    "userPassword": "admin"
}
```

## Register註冊

- POST請求
- 地址為 localhost:5000/register

```json
{
		"userName":"admin",
		"userPassword": "admin"
}
```