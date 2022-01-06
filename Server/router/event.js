const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../database/index')
const datatype = require('../function/datatype')
const file = require('../function/file')
const router = express.Router()
const Coupon = require('../class/event/coupon')
const Event = require('../class/event/event')

router.post('/add', datatype.verifyToken, async (req, res, next) => {
    var type = req.body.type
    var userName = req.body.userName
    var name = req.body.name
    var date = req.body.date
    var _date = new Date(date)
    var currentDate = Date.now()
    var state = true
    var response = {
        "error": "",
        "state": 0
    }
    if (type != 'business' & type != 'admin') {
        response["error"] = "不是business或admin"
        response["state"] = 500
        state = false
    }
    if (name == '') {
        response["error"] = "活動名不符合限制"
        response["state"] = 500
        state = false
    }
    if (_date < currentDate) {
        response["error"] = "到期日不符合限制"
        response["state"] = 500
        state = false
    }
    if (state) {
        var userId = 0
        var sqlUpdate = ``
        try {
            if (type == 'business') {
                userId = await database.GetUserId(userName)
                if (userId == null) {
                    let response = {
                        "error": "找不到該用戶",
                        "state": 500
                    }
                    res.json(response)
                }
            }
            else if (type == 'admin') {
                userId = await database.GetAdminId(userName)
                if (userId != null) {
                    var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                    if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event') {
                        let response = {
                            "error": "管理員沒有該權限",
                            "state": 500
                        }
                        res.json(response)
                    }
                }
                else {
                    let response = {
                        "error": "找不到該用戶",
                        "state": 500
                    }
                    res.json(response)
                }
            }
            console.log(userId)
            try {
                var organizerId = await database.GetOrganizerId(type, userId)
                console.log(organizerId)
                if (organizerId != null) {
                    try {
                        var insertResult = await database.sqlConnection(`insert into event(organizerId,name,date)value(${organizerId},"${name}","${date}");`)
                        console.log(insertResult)
                        response["state"] = 200
                    } catch (e) {
                        response["error"] = "活動名不符合限制"
                        response["state"] = 500
                        state = false
                        console.log(e)
                    }
                }
                else {
                    response["error"] = "網路連線錯誤"
                    response["state"] = 500
                    state = false
                }
            } catch (e) {
                response["error"] = "網路連線錯誤"
                response["state"] = 500
                state = false
                console.log(e)
            }
        } catch (e) {
            response["error"] = "網路連線錯誤"
            response["state"] = 500
            state = false
            console.log(e)
        }
    }
    res.json(response)
})

router.post('/search', datatype.verifyToken, async (req, res, next) => {
    var type = req.body.type
    var userName = req.body.userName
    if (type == 'business') {
        try {
            var userId = await database.GetUserId(userName)
            if (userId == null) {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else if (type == 'admin') {
        try {
            var userId = await database.GetAdminId(userName)
            if (userId != null) {
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event') {
                    let response = {
                        "error": "管理員沒有該權限",
                        "state": 500
                    }
                    res.json(response)
                }
            }
            else {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }

        } catch (e) {
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else {

        let response = {
            "error": "不是business或admin",
            "state": 500
        }
        res.json(response)
    }
    try {
        var organizerId = await database.GetOrganizerId(type, userId)
        if (organizerId != null) {
            try {
                var result = await database.sqlConnection(`select * from event where organizerId = ${organizerId}`)
                console.log(result)
                var response = []
                result.forEach(function (item, index, array) {
                    let event = datatype.json2json(item)
                    console.log(event)
                    response.push(event)
                });
                res.json(response)
            } catch (e) {
                console.log(e)
                let response = {
                    "error": "網路連線失敗",
                    "state": 500
                }
                res.json(response)
            }
        }
        else {
            let response = {
                "error": "未辦過活動",
                "state": 500
            }
            res.json(response)
        }

    } catch (e) {
        console.log(e)
        let response = {
            "error": "網路連線失敗",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/update', datatype.verifyToken, async (req, res, next) => {
    var type = req.body.type
    var userName = req.body.userName
    if (type == 'business') {
        try {
            var userId = await database.GetUserId(userName)
            if (userId == null) {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else if (type == 'admin') {
        try {
            var userId = await database.GetAdminId(userName)
            if (userId != null) {
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event') {
                    let response = {
                        "error": "管理員沒有該權限",
                        "state": 500
                    }
                    res.json(response)
                }
            }
            else {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }

        } catch (e) {
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else {

        let response = {
            "error": "不是business或admin",
            "state": 500
        }
        res.json(response)
    }
    var name = req.body.name
    var date = req.body.date
    var _date = new Date(date)
    var currentDate = Date.now()
    if (_date < currentDate) {
        let response = {
            "error": "到期日不符合限制",
            "state": 500
        }
        res.json(response)
    }
    try {
        var organizerId = await database.GetOrganizerId(type, userId)
        console.log(organizerId)
        if (organizerId != null) {
            const sql = `update event set date = "${date}" where organizerId = ${organizerId} and name = "${name}";`
            console.log(sql)
            try {
                var result = await database.sqlConnection(sql)
                if (result["affectedRows"] != 0) {
                    let response = {
                        "error": "",
                        "state": 200
                    }
                    res.json(response)
                }
                else {
                    let response = {
                        "error": "找不到該活動",
                        "state": 500
                    }
                    res.json(response)
                }
            } catch (e) {
                let response = {
                    "error": "網路連線失敗",
                    "state": 500
                }
                res.json(response)
            }
        }
        else {
            let response = {
                "error": "找不到該活動",
                "state": 500
            }
            res.json(response)
        }
    } catch (e) {
        console.log(e)
        let response = {
            "error": "網路連線失敗",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/delete', datatype.verifyToken, async (req, res, next) => {
    var type = req.body.type
    var userName = req.body.userName
    if (type == 'business') {
        try {
            var userId = await database.GetUserId(userName)
            if (userId == null) {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }
        } catch (e) {
            console.log(e)
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else if (type == 'admin') {
        try {
            var userId = await database.GetAdminId(userName)
            if (userId != null) {
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event') {
                    let response = {
                        "error": "管理員沒有該權限",
                        "state": 500
                    }
                    res.json(response)
                }
            }
            else {
                let response = {
                    "error": "找不到該用戶",
                    "state": 500
                }
                res.json(response)
            }

        } catch (e) {
            let response = {
                "error": "網路連線失敗",
                "state": 500
            }
            res.json(response)
        }
    }
    else {
        let response = {
            "error": "不是business或admin",
            "state": 500
        }
        res.json(response)
    }
    var name = req.body.name
    try {
        var organizerId = await database.GetOrganizerId(type, userId)
        console.log(organizerId)
        if (organizerId != null) {
            const sqlDelete = `delete from event where organizerId = ${organizerId} and name = "${name}";`
            try {
                var result = await database.sqlConnection(sqlDelete)
                if (result["affectedRows"] != 0) {
                    let response = {
                        "error": "",
                        "state": 200
                    }
                    res.json(response)
                }
                else {
                    let response = {
                        "error": "找不到該活動",
                        "state": 500
                    }
                    res.json(response)
                }
            } catch (e) {
                let response = {
                    "error": "網路連線失敗",
                    "state": 500
                }
                res.json(response)
            }
        } else {
            let response = {
                "error": "找不到該活動",
                "state": 500
            }
            res.json(response)
        }
    } catch (e) {
        let response = {
            "error": "網路連線失敗",
            "state": 500
        }
        res.json(response)
    }

})

router.get('/all', async (req, res, next) => {
    var event = new Event(req)
    try {
        var result = await event.getAllEvent()
        if (result == false) {
            let response = {
                "error": event.errorMessage,
                "state": event.state
            }
            res.json(response)
        }
        else if (result == true) {
            res.json(new Array())
        }
        else {
            res.json(result)
        }
    } catch (e) {
        console.log(e)
        let response = {
            "error": event.errorMessage,
            "state": event.state
        }
        res.json(response)
    }
})

router.post('/coupon/add', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    if (state) {
        var result = coupon.checkAll()
    }
    if (result == false) {
        state = false
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
    if (coupon.type == 'business') {
        if (state) {
            result = await coupon.getBusinessId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    else if (coupon.type == 'admin') {
        if (state) {
            result = await coupon.getAdminId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    if (state) {
        result = await coupon.getOrganizerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkNameAvailable()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkDateAvailableByName()
        if (result == false) {
            state = false;
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.addNewCoupon()
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
})

router.post('/coupon/search', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    if (state) {
        var result = coupon.checkType()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (coupon.type == 'business') {
        if (state) {
            result = await coupon.getBusinessId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    else if (coupon.type == 'admin') {
        if (state) {
            result = await coupon.getAdminId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    if (state) {
        result = await coupon.getOrganizerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.searchCoupon()
        console.log(result)
        if (result == false) {
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
        else if (result == true) {
            res.json(new Array())
        }
        else {
            res.json(result)
        }
    }
})

router.post('/coupon/update', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    if (state) {
        var result = coupon.checkAll()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (coupon.type == 'business') {
        if (state) {
            result = await coupon.getBusinessId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    else if (coupon.type == 'admin') {
        if (state) {
            result = await coupon.getAdminId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    if (state) {
        result = await coupon.getOrganizerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkOrganizerHaveCoupon()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkDateAvailable()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.updateCoupon()
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
})

router.post('/coupon/delete', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    if (state) {
        var result = coupon.checkType()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (coupon.type == 'business') {
        if (state) {
            result = await coupon.getBusinessId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    else if (coupon.type == 'admin') {
        if (state) {
            result = await coupon.getAdminId()
            if (result == false) {
                state = false
                let response = {
                    "error": coupon.errorMessage,
                    "state": coupon.state
                }
                res.json(response)
            }
        }
    }
    if (state) {
        result = await coupon.getOrganizerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkOrganizerHaveCoupon()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.deleteCoupon()
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
})

router.post('/coupon/customer/search', async (req, res, next) => {
    var name = req.body.name
    const sqlSearch = `select code,eventName as name,discount,date,maxQuantity,description from coupon where eventName = "${name}";`
    try {
        let response = []
        var result = await database.sqlConnection(sqlSearch)
        result.forEach(function (item, index, array) {
            let coupon = datatype.json2json(item)
            console.log(coupon)
            response.push(coupon)
        });
        res.json(response)
    } catch (e) {
        console.log(e)
        let response = {
            "error": "網路連線失敗",
            "state": 500
        }
        res.json(response)
    }
})

router.post('/coupon/customer/receive', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    if (state) {
        var result = await coupon.getCustomerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkCodeAvailableByNothing()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.getMaxQuantity()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.receiveCoupon()
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
})

router.post('/coupon/customer/product', async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    var result = null
    if (state) {
        result = await coupon.getCustomerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.setProductId(req.body.productId)
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.searchCouponByProductId()
        if (result == false) {
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
        else if (result == true) {
            res.json(new Array())
        }
        else {
            res.json(result)
        }
    }
})

router.post('/coupon/customer/all', async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    var result = null
    if (state) {
        result = await coupon.getCustomerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.searchCouponByAdmin()
        if (result == false) {
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
        else if (result == true) {
            res.json(new Array())
        }
        else {
            res.json(result)
        }
    }
})

router.post('/coupon/customer/have', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    var result = null
    if (state) {
        result = await coupon.getCustomerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.searchAllCustomerHave()
        if (result == false) {
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
        else if (result == true) {
            res.json(new Array())
        }
        else {
            res.json(result)
        }
    }
})

router.post('/coupon/customer/use', datatype.verifyToken, async (req, res, next) => {
    var coupon = new Coupon(req)
    var state = true
    var result = null
    if (state) {
        result = await coupon.getCustomerId()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkCodeAvailableByNothing()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkCustomerHaveCoupon()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.checkCouponQuantity()
        if (result == false) {
            state = false
            let response = {
                "error": coupon.errorMessage,
                "state": coupon.state
            }
            res.json(response)
        }
    }
    if (state) {
        result = await coupon.useCoupon()
        let response = {
            "error": coupon.errorMessage,
            "state": coupon.state
        }
        res.json(response)
    }
})
module.exports = router