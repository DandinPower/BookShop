const { request } = require('express')
const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const file = require('../function/file')
const multer = require('multer')
const router = express.Router()

router.get('/search/:keywords', async (req, res, next) => {
    var keywords = req.params.keywords
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.uploadedDate,I.content as image \
                from product as P join business as B on P.businessId = B.id \
                join account as A on B.id = A.id \
                left join image_list as I on I.productId = P.no \
                where P.name like "%${keywords}%" \ 
                or P.category like "%${keywords}%" \
                or P.description like "%${keywords}%";`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        //console.log(result);
        result.forEach(function (item, index, array) {
            let product = datatype.json2json(item)
            if (product["image"] != null) {
                product["image"] = Buffer.from(product["image"]).toString('base64')
            }
            else {
                product["image"] = ""
            }
            //console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e);
    }
    res.json(response)
})

router.get('/categories', async (req, res, next) => {
    const sql = `SELECT distinct category FROM product;`
    response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            response.push(item['category'])
        });
    } catch (e) {
        console.log(e);
    }
    res.send(response)
})

router.get('/category/:name', async (req, res, next) => {
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.uploadedDate,I.content as image from product as P join business as B on P.businessId = B.id join account as A on B.id = A.id left join image_list as I on I.productId = P.no where P.category = "${req.params.name}";`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        //console.log(result);
        result.forEach(function (item, index, array) {
            let product = datatype.json2json(item)
            if (product["image"] != null) {
                product["image"] = Buffer.from(product["image"]).toString('base64')
            }
            else {
                product["image"] = ""
            }
            //console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e);
    }
    res.json(response)
})

router.get('/all', async (req, res, next) => {
    const sql = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.uploadedDate,I.content as image from product as P join business as B on P.businessId = B.id join account as A on B.id = A.id left join image_list as I on I.productId = P.no where P.launch = "1";`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        //console.log(result);
        result.forEach(function (item, index, array) {
            let product = datatype.json2json(item)
            if (product["image"] != null) {
                product["image"] = Buffer.from(product["image"]).toString('base64')
            }
            else {
                product["image"] = ""
            }
            //console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e);
    }
    res.json(response)
})

router.get('/image/all', async (req, res, next) => {
    var response = []
    try {
        const sql = `select * from image_list;`
        let result = await database.sqlConnection(sql)
        console.log(result)
        result.forEach(function (item, index, array) {
            let productId = item["productId"]
            let content = item["content"]
            let image = Buffer.from(content).toString('base64')
            let product = {
                "productId": productId,
                "image": image
            }
            console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e)
    }
    res.send(response)
})

router.get('/image/category/:name', async (req, res, next) => {
    var response = []
    try {
        const sql = `select * from image_list as I,product as P where I.productId = P.no and P.category = "${req.params.name}";`
        let result = await database.sqlConnection(sql)
        console.log(result)
        result.forEach(function (item, index, array) {
            let productId = item["productId"]
            let content = item["content"]
            let image = Buffer.from(content).toString('base64')
            let product = {
                "productId": productId,
                "image": image
            }
            console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e)
    }
    res.send(response)
})

router.get('/image/:productId', async (req, res, next) => {
    var product = {
        "productId": 0,
        "image": ""
    }
    try {
        const sql = `select * from image_list where productId = ${req.params.productId};`
        let result = await database.sqlConnection(sql)
        console.log(result)
        product["productId"] = result[0]["productId"]
        let content = result[0]["content"]
        product["image"] = Buffer.from(content).toString('base64')
    } catch (e) {
        console.log(e)
    }
    res.send(product)
})

router.post('/comment', async (req, res, next) => {
    var productId = req.body.productId
    const sql = `select PC.productId,PC.star,PC.comment,A.name from product_comment as PC,account as A,customer as C where PC.customerId = C.id and C.id = A.id and PC.productId = ${productId};`
    var response = []
    console.log(sql)
    try {
        result = await database.sqlConnection(sql);
        console.log(result);
        result.forEach(function (item, index, array) {
            let product = datatype.json2json(item)
            console.log(product)
            response.push(product)
        });
    } catch (e) {
        console.log(e);
    }
    res.json(response)
})

router.post('/add', datatype.verifyTokenByList, async (req, res, next) => {
    var state = true
    var request = req.body
    var response = {
        "error": "",
        "state": 0
    }
    var result = await Promise.all(request.map(async (item, index, array) => {
        let product = datatype.json2json(item)
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        var userName = product["userName"]
        var productId = product["productId"]
        var quantity = product["quantity"]
        var discount = product["discount"]
        var address = product["address"]
        var paymentInfo = product["paymentInfo"]
        try {
            var customerId = await database.GetUserId(userName)
            console.log(customerId)
            try {
                var businessId = await database.GetBusinessId(productId)
                console.log(businessId)
                try {
                    const sqlInsert = `insert into orders(customerId,orderDate,quantity,discount,address,paymentInfo)value(${customerId},"${currentDate}",${quantity},${discount},"${address}","${paymentInfo}");`
                    console.log(sqlInsert)
                    var InsertResult = await database.sqlConnection(sqlInsert)
                    console.log(InsertResult)
                    var insertId = InsertResult["insertId"]
                    try {
                        const sqlManage = `insert into manage(businessId,orderNo,productId)value(${businessId},${insertId},${productId});`
                        console.log(sqlManage)
                        var ManageResult = await database.sqlConnection(sqlManage)
                        console.log(ManageResult)
                    } catch (e) {
                        console.log(e)
                        response["error"] = "插入manage失敗"
                        response["state"] = 500
                        state = false
                        return "fail"
                    }
                } catch (e) {
                    console.log(e)
                    response["error"] = "插入order失敗"
                    response["state"] = 500
                    state = false
                    return "fail"
                }
            } catch (e) {
                console.log(e)
                response["error"] = "找不到廠商"
                response["state"] = 500
                state = false
                return "fail"
            }

        } catch (e) {
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
            state = false
            return "fail"
        }

        return "true"
    }));
    if (state) {
        response["state"] = 200
    }
    res.json(response)
})

router.post('/search', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName;
    try {
        var customerId = await database.GetUserId(userName)
        console.log(customerId)
        try {
            let response = []
            var sqlSearch = `select P.price,P.name,O.quantity,O.orderNo,O.status,PC.comment as commentState,O.discount,O.address,O.paymentInfo,O.orderDate,O.arrivalDate \
                                from product as P \
                                join manage as M on P.no = M.productId \
                                join orders as O on O.orderNo = M.orderNo \  
                                join customer as C on C.id = O.customerId \
                                left join product_comment as PC on PC.orderNo = O.orderNo and PC.customerId = C.id \
                                where O.customerId = ${customerId};`
            console.log(sqlSearch)
            var result = await database.sqlConnection(sqlSearch)
            result.forEach(function (item, index, array) {
                let product = datatype.json2json(item)
                if (product["commentState"] != null) {
                    product["commentState"] = "已評論"
                }
                else {
                    product["commentState"] = "未評論"
                }
                //console.log(product)
                response.push(product)
            });
            res.json(response)
        } catch (e) {
            let response = {
                "error": "找尋訂單失敗",
                "state": 500
            }
            res.json(response)
        }
    } catch (e) {
        let response = {
            "error": "找不到使用者",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/manage/add', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName;
    var description = req.body.description
    var name = req.body.name
    var price = req.body.price
    var status = req.body.status
    var category = req.body.category
    var today = new Date();
    var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var response = {
        "productId": 0,
        "error": "",
        "state": 0
    }
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                const sqlInsert = `insert into product (businessId,description,name,price,status,category,uploadedDate) value (${businessId},"${description}","${name}",${price},"${status}","${category}","${currentDate}");`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["productId"] = result["insertId"]
                response["state"] = 200

            } catch (e) {
                response["error"] = "新增商品失敗"
                response["state"] = 500
            }
        }
        else {
            response["error"] = "找不到使用者"
            response["state"] = 500
        }

    } catch (e) {
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/search', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName;
    var response = {
        "error": "",
        "state": 0
    }
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                const sqlInsert = `select P.no as productId,A.name as businessName,P.description,P.name,P.price,P.status,P.launch,P.category,P.uploadedDate,I.content as image from product as P join business as B on P.businessId = B.id join account as A on B.id = A.id left join image_list as I on I.productId = P.no where B.id = ${businessId};`
                var result = await database.sqlConnection(sqlInsert)
                var response = []
                //console.log(result)
                result.forEach(function (item, index, array) {
                    let product = datatype.json2json(item)
                    if (product["image"] != null) {
                        product["image"] = Buffer.from(product["image"]).toString('base64')
                    }
                    else {
                        product["image"] = ""
                    }
                    //console.log(product)
                    response.push(product)
                });
            } catch (e) {
                response["error"] = "查找商品失敗"
                response["state"] = 500
            }
        }
        else {
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    } catch (e) {
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/update', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var productId = req.body.productId
    var description = req.body.description
    var name = req.body.name
    var price = req.body.price
    var status = req.body.status
    var category = req.body.category
    var image = req.body.image
    var response = {
        "error": "",
        "state": 0
    }
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                const sqlInsert = `update product set description = "${description}",name = "${name}",price = ${price},status = "${status}",category = "${category}" where no = ${productId};`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["state"] = 200
            } catch (e) {
                console.log(e)
                response["error"] = "修改商品失敗"
                response["state"] = 500
            }
        }
        else {
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    } catch (e) {
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/delete', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var productId = req.body.productId
    try {
        var businessId = await database.GetUserId(userName)
        if (businessId != null) {
            const sql = `delete from product where no = ${productId};`
            try {
                var result = await database.sqlConnection(sql)
                console.log(result)
                if (result["affectedRows"] != 0) {
                    let response = {
                        "error": "",
                        "state": 200
                    }
                    res.json(response)
                } else {
                    let response = {
                        "error": "沒有這個productId",
                        "state": 500
                    }
                    res.json(response)
                }

            } catch (e) {
                console.log(e)
                let response = {
                    "error": "網路連線錯誤",
                    "state": 500
                }
                res.json(response)
            }
        } else {
            let response = {
                "error": "找不到該用戶",
                "state": 500
            }
            res.json(response)
        }

    } catch (e) {
        console.log(e)
        let response = {
            "error": "網路連線錯誤",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/manage/launch', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var productId = req.body.productId
    var launch = req.body.launch
    var response = {
        "error": "",
        "state": 0
    }
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                const sqlInsert = `update product set launch = "${launch}" where no = ${productId};`
                var result = await database.sqlConnection(sqlInsert)
                console.log(result)
                response["state"] = 200
            } catch (e) {
                console.log(e)
                response["error"] = "修改上下架失敗"
                response["state"] = 500
            }
        }
        else {
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    } catch (e) {
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/order/search', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName;
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                let response = []
                var sqlSearch = `select P.no as productId,P.price,P.name,O.orderNo,O.quantity,O.status,O.discount,O.address,O.paymentInfo,O.orderDate,O.arrivalDate,O.customerId from product as P,orders as O,manage as M,business as B where P.no = M.productId and O.orderNo = M.orderNo and M.businessId = ${businessId} and B.id = M.businessId;`
                console.log(sqlSearch)
                var result = await database.sqlConnection(sqlSearch)
                result.forEach(function (item, index, array) {
                    let product = datatype.json2json(item)
                    console.log(product)
                    response.push(product)
                });
                res.json(response)
            } catch (e) {
                console.log(e)
                let response = {
                    "error": "找尋訂單失敗",
                    "state": 500
                }
                res.json(response)
            }
        }
        else {
            console.log(e)
            let response = {
                "error": "找不到使用者",
                "state": 500
            }
            res.json(response)
        }

    } catch (e) {
        console.log(e)
        let response = {
            "error": "找不到使用者",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/manage/order/status', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var orderNo = req.body.orderNo
    var status = req.body.status
    var response = {
        "error": "",
        "state": 0
    }
    try {
        var businessId = await database.GetUserId(userName)
        console.log(businessId)
        if (businessId != null) {
            try {
                const sqlUpdate = `update orders set status = "${status}" where orderNo = ${orderNo} and ${orderNo} in (select orderNo from manage where businessId = ${businessId});`
                var result = await database.sqlConnection(sqlUpdate)
                if (result["affectedRows"] == 0) {
                    response["error"] = "找不到該訂單"
                    response["state"] = 500
                }
                else {
                    console.log(result)
                    response["state"] = 200
                }
            } catch (e) {
                console.log(e)
                response["error"] = "修改訂單status失敗"
                response["state"] = 500
            }
        }
        else {
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    } catch (e) {
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/order/comment', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var orderNo = req.body.orderNo
    var star = req.body.star
    var comment = req.body.comment
    var response = {
        "error": "",
        "state": 0
    }
    try {
        var customerId = await database.GetUserId(userName)
        console.log(customerId)
        if (customerId != null) {
            try {
                const sqlSearch = `select productId from manage where orderNo = ${orderNo};`
                var result = await database.sqlConnection(sqlSearch)
                if (result.length == 0) {
                    response["error"] = "找不到該訂單"
                    response["state"] = 500
                }
                else {
                    productId = result[0]["productId"]
                    if (star <= 5 & star >= 0) {
                        try {
                            const sqlInsert = `insert into product_comment(productId,customerId,orderNo,star,comment) value(${productId},${customerId},${orderNo},${star},"${comment}");`
                            let result = await database.sqlConnection(sqlInsert)
                            console.log(result)
                            response["state"] = 200
                        } catch (e) {
                            console.log(e)
                            response["error"] = "插入評論失敗"
                            response["state"] = 500
                        }
                    }
                    else {
                        response["error"] = "評價超出限制"
                        response["state"] = 500
                    }

                }
            } catch (e) {
                console.log(e)
                response["error"] = "找不到該訂單"
                response["state"] = 500
            }
        }
        else {
            console.log(e)
            response["error"] = "找不到使用者"
            response["state"] = 500
        }
    } catch (e) {
        console.log(e)
        response["error"] = "找不到使用者"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/add/image/:productId', file.UploadImage.single('image'), async (req, res, next) => {
    var productId = req.params.productId
    var response = {
        "error": "",
        "state": 0
    }
    try {
        if (req.file != undefined) {
            console.log(req.file)
            response["state"] = 200
        }
        else {
            console.log('沒有上傳圖片')
            response["error"] = "沒選擇圖片"
            response["state"] = 500
        }
        var sql = `insert into image_list(productId,content)value(${productId},?);`
        let result = await database.sqlConnectionFile(sql, req.file.buffer)
        console.log(result)
    } catch (e) {
        console.log(e)
        response["error"] = "已存在圖片"
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/update/image/:productId', file.UploadImage.single('image'), async (req, res, next) => {
    var productId = req.params.productId
    var response = {
        "error": "",
        "state": 0
    }
    try {
        if (req.file != undefined) {
            response["state"] = 200
            console.log(req.file)
        }
        else {
            console.log('沒有上傳圖片')
            response["error"] = "沒選擇圖片"
            response["state"] = 500
        }
        var sql = `update image_list set content = ? where productId = ${productId};`
        let result = await database.sqlConnectionFile(sql, req.file.buffer)
        console.log(result)
        if (result["affectedRows"] == 0) {
            try {
                let sql = `insert into image_list(productId,content)value(${productId},?);`
                let result = await database.sqlConnectionFile(sql, req.file.buffer)
                console.log(result)
                response["state"] = 200
            } catch (e) {
                console.log(e)
                response["error"] = "沒有此項商品"
                response["state"] = 500
            }
        }
        else {
            response["state"] = 200
        }

    } catch (e) {
        console.log(e)
        response["error"] = "網路連線錯誤"  //資料庫錯誤
        response["state"] = 500
    }
    res.json(response)
})

router.post('/manage/order/delete', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var orderNo = req.body.orderNo
    var state = true
    if (state) {
        try {
            var userId = await database.GetUserId(userName)
            console.log(userId)
            if (userId == null) {
                state = false
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }

        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        try {
            const sqlCheckStatus = `select O.status from orders as O where O.orderNo = ${orderNo} and ${orderNo} in (select orderNo from manage where businessId = ${userId});`
            console.log(sqlCheckStatus)
            var result = await database.sqlConnection(sqlCheckStatus)
            if (result.length == 0) {
                state = false
                let response = {
                    "error": "找不到該訂單",
                    "state": 500
                }
                res.json(response)
            }
            else {
                var status = result[0].status
                if (status != '未出貨') {
                    state = false
                    let response = {
                        "error": "此訂單狀態不能撤銷",
                        "state": 500
                    }
                    res.json(response)
                }
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        try {
            const sql = `update orders set status = "賣家撤銷此訂單" where orderNo = ${orderNo};`
            var result = await database.sqlConnection(sql)
            console.log(result)
            if (result["affectedRows"] != 0) {
                let response = {
                    "error": "",
                    "state": 200
                }
                res.json(response)
            }
            else {
                state = false
                let response = {
                    "error": "未知的錯誤",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
})

router.post('/order/cancel', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var orderNo = req.body.orderNo
    var state = true
    if (state) {
        try {
            var userId = await database.GetUserId(userName)
            if (userId == null) {
                state = false
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        try {
            const sqlCheckStatus = `select O.status from orders as O where O.orderNo = ${orderNo} and ${orderNo} in (select orderNo from manage where customerId = ${userId});`
            console.log(sqlCheckStatus)
            var result = await database.sqlConnection(sqlCheckStatus)
            if (result.length == 0) {
                state = false
                let response = {
                    "error": "找不到該訂單",
                    "state": 500
                }
                res.json(response)
            }
            else {
                var status = result[0].status
                if (status == '申請取消') {
                    state = false
                    let response = {
                        "error": "商品已經申請取消了",
                        "state": 500
                    }
                    res.json(response)
                }
                else if (status != '未出貨') {
                    state = false
                    let response = {
                        "error": "商品已出貨不能取消",
                        "state": 500
                    }
                    res.json(response)
                }
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        const sqlUpdateState = `update orders set status = "申請取消" where orderNo = ${orderNo};`
        console.log(sqlUpdateState)
        try {
            var result = await database.sqlConnection(sqlUpdateState)
            console.log(result)
            if (result["affectedRows"] != 0) {
                let response = {
                    "error": "",
                    "state": 200
                }
                res.json(response)
            }
            else {
                state = false
                let response = {
                    "error": "未知的錯誤",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
})

router.post('/order/cancel/confirm', datatype.verifyToken, async (req, res, next) => {
    var userName = req.body.userName
    var orderNo = req.body.orderNo
    var answer = req.body.answer
    var state = true
    if (state) {
        try {
            var userId = await database.GetUserId(userName)
            console.log(userId)
            if (userId == null) {
                state = false
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }

        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        try {
            const sqlCheckStatus = `select O.status from orders as O where O.orderNo = ${orderNo} and ${orderNo} in (select orderNo from manage where businessId = ${userId});`
            console.log(sqlCheckStatus)
            var result = await database.sqlConnection(sqlCheckStatus)
            if (result.length == 0) {
                state = false
                let response = {
                    "error": "找不到該訂單",
                    "state": 500
                }
                res.json(response)
            }
            else {
                var status = result[0].status
                if (status != '申請取消') {
                    state = false
                    let response = {
                        "error": "商品沒有申請取消",
                        "state": 500
                    }
                    res.json(response)
                }
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        if (answer == "Yes") {
            var change = "取消成功"
        }
        else if (answer == "No") {
            var change = "未出貨"
        }
        else {
            state = false
            let response = {
                "error": "未知的回復",
                "state": 500
            }
            res.json(response)
        }
    }
    if (state) {
        try {
            const sql = `update orders set status = "${change}" where orderNo = ${orderNo};`
            var result = await database.sqlConnection(sql)
            console.log(result)
            if (result["affectedRows"] != 0) {
                let response = {
                    "error": "",
                    "state": 200
                }
                res.json(response)
            }
            else {
                state = false
                let response = {
                    "error": "未知的錯誤",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            state = false
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
})
module.exports = router