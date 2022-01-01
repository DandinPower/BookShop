const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../../database/index')
const datatype = require('../../function/datatype')
const file = require('../../function/file')
const router = express.Router()

class Coupon {
    
    //constructor
    constructor(req) {
        this.type = req.body.type
        this.userName = req.body.userName 
        this.name = req.body.name 
        this.code = req.body.code
        this.date = req.body.date
        this._date = new Date(this.date)
        this.discount = req.body.discount 
        this.maxQuantity = req.body.maxQuantity
        this.initialize()
    }
    /*
    constructor(type, userName, name){
        this.type = type
        this.userName = userName 
        this.name = name 
        this.initialize()
    }*/

    //初始化參數
    initialize() {
        this.errorMessage = ""
        this.state = 0
        this.userId = null
        this.organizerId = null
        this.productId = null
    }

    //在新增或修改時檢查輸入的type
    checkType() {
        if (this.type != 'business' & this.type != 'admin'){
            this.errorMessage = "不是business或admin"
            this.state = 500
            return false 
        }
        else{
            return true
        }
    }

    //在新增或修改的時候檢查輸入的優惠碼
    checkCode() {
        if (this.code.length >= 10 | this.code.length <= 0){
            this.errorMessage = "優惠碼不符合限制"
            this.state = 500
            return false 
        }
        else{
            return true
        }
    }

    //在新增或修改的時候檢查輸入的date
    checkDate() {
        var currentDate = Date.now()
        if (this._date < currentDate){
            this.errorMessage = "到期日不符合限制"
            this.state = 500
            return false 
        }
        else{
            return true
        }
    }

    //在新增或修改時檢查輸入的discount
    checkDiscount() {
        if (this.discount <= 0 | this.discount >1){
            this.errorMessage = "折扣不符合限制"
            this.state = 500
            return false 
        }
        else{
            return true
        }
    }

    //在新增或修改時檢查輸入的maxQuantity
    checkMaxQuantity() {
        if (this.maxQuantity <= 0){
            this.errorMessage = "最大數量不符合限制"
            this.state = 500
            return false
        }
        else{
            return true
        }
    }

    //檢查所有輸入限制
    checkAll(){
        if (this.checkType() == false){
            return false
        }
        if (this.checkCode() == false){
            return false
        }
        if (this.checkDate() == false){
            return false
        }
        if (this.checkDiscount() == false){
            return false
        }
        if (this.checkMaxQuantity() == false){
            return false
        }
        return true
    }

    //取得customerId
    async getCustomerId() {
        try{
            this.userId = await database.GetUserId(this.userName)
            if (this.userId == null){
                this.errorMessage = "找不到該用戶"
                this.state = 500
                return false
            }
            else{
                return true
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //設置買家欲查詢的商品id
    async setProductId(productId){
        const sql = `select * from product where no = ${productId};`
        console.log(sql)
        try{
            var result = await database.sqlConnection(sql)
            if (result.length != 0){
                this.productId = productId
                return true 
            }
            else{
                this.errorMessage = "找不到該產品"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //根據參數查找符合的優惠券
    async searchCouponByProductId() {
        const sql = `select C.code,C.discount,C.date,H.quantity\
                        from coupon as C \
                        join event as E on E.name = C.eventName \
                        join organizer as O on O.organizerId = E.organizerId \
                        join business as B on B.organizerId = O.organizerId \
                        join product as P on P.businessId = B.id \
                        join have as H on H.couponCode = C.code \
                        where P.no = ${this.productId} \
                        and H.customerId = ${this.userId};`
        console.log(sql)
        try{
            var result = await database.sqlConnection(sql)
            console.log(result)
            let response = []
            result.forEach(function(item, index, array) {
                let coupon = datatype.json2json(item)
                console.log(coupon)
                response.push(coupon)
            });
            if (response.length == 0){
                return true
            }
            else {
                return response
            } 
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //搜尋管理員開的所有優惠券
    async searchCouponByAdmin() {
        const sql = `select C.code,C.discount,C.date,H.quantity\
                        from coupon as C \
                        join event as E on E.name = C.eventName \
                        join organizer as O on O.organizerId = E.organizerId \
                        join admin as A on A.organizerId = O.organizerId \
                        join have as H on H.couponCode = C.code \
                        where H.customerId = ${this.userId};`
        console.log(sql)
        try{
            var result = await database.sqlConnection(sql)
            console.log(result)
            let response = []
            result.forEach(function(item, index, array) {
                let coupon = datatype.json2json(item)
                console.log(coupon)
                response.push(coupon)
            });
            if (response.length == 0){
                return true
            }
            else {
                return response
            } 
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //如果type是business則透過此function取得userId
    async getBusinessId() {
        try{
            this.userId = await database.GetUserId(this.userName)
            if (this.userId == null){
                this.errorMessage = "找不到該用戶"
                this.state = 500
                return false
            }
            else{
                return true
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //如果type是admin則透過此function取得userId
    async getAdminId() {
        try{
            this.userId = await database.GetAdminId(this.userName)
            if (this.userId != null){
                var adminResult = await database.sqlConnection(`select authority from admin where id = ${this.userId}`)
                if (adminResult[0].authority != 'all' & adminResult[0].authority != 'event'){
                    this.errorMessage = "管理員沒有該權限"
                    this.state = 500
                    return false
                }
                else {
                    return true
                }
            }
            else{
                this.errorMessage = "找不到該用戶"
                this.state = 500
                return false
            }
        }catch(e){
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }  
    }

    //根據userId取得organizerId
    async getOrganizerId() {
        try{
            this.organizerId = await database.GetOrganizerId(this.type,this.userId)
            console.log(this.organizerId)
            if (this.organizerId != null){
                return true
            }
            else{
                this.errorMessage = "找不到該活動"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //設置organizerId
    setOrganizerId(organizerId){
        this.organizerId = organizerId
    }

    //根據organizerId檢查是否有相符的活動名稱
    async checkNameAvailable() {
        try{
            var nameResult = await database.sqlConnection(`select name from event where organizerId = ${this.organizerId};`)
            nameResult = datatype.packet2list(nameResult,"name")
            console.log(nameResult) 
            console.log(this.name)   
            if (nameResult.includes(this.name)){
                return true
            }
            else{
                this.errorMessage = "找不到該活動"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查organizer有無此優惠券
    async checkOrganizerHaveCoupon(){
        try{
            var result = await database.sqlConnection(`select * from coupon as C join event as E on C.eventName = E.name where E.organizerId = ${this.organizerId} and C.code = "${this.code}";`)
            console.log(result)
            if (result.length != 0){
                return true
            }
            else{
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //根據organizerId跟活動名稱檢查是否有相符的優惠券
    async checkCodeAvailable() {
        try{
            var codeResult = await database.sqlConnection(`select code from coupon where organizerId = ${this.organizerId} and eventName = "${this.name}";`)
            codeResult = datatype.packet2list(codeResult,"code")
            console.log(codeResult) 
            console.log(this.code)   
            if (codeResult.includes(this.code)){
                return true
            }
            else{
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查是否有相符的優惠券
    async checkCodeAvailableByNothing() {
        try{
            var codeResult = await database.sqlConnection(`select * from coupon where code = "${this.code}";`)
            if (codeResult.length != 0){
                return true
            }
            else{
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //查詢用戶的擁有的優惠券裡有無欲使用的這張
    async checkCustomerHaveCoupon() {
        try{
            var result = await database.sqlConnection(`select * from have where customerId = ${this.userId} and couponCode = "${this.code}";`)
            if (result.length != 0){
                return true
            }else{
                this.errorMessage = "未領取該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查用戶的優惠券quantity還夠不夠
    async checkCouponQuantity() {
        try{
            var result = await database.sqlConnection(`select quantity from have where customerId = ${this.userId} and couponCode = "${this.code}";`)
            if (result[0]["quantity"] > 0){
                return true
            }else{
                this.errorMessage = "該優惠券已使用完畢"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //搜尋所有買家有的優惠券
    async searchAllCustomerHave(){
        const sqlSearch = `select C.code,C.discount,C.date,H.quantity from coupon as C join have as H on C.code = H.couponCode where H.customerId = ${this.userId};`
        console.log(sqlSearch)
        try{
            var result = await database.sqlConnection(sqlSearch)
            console.log(result)
            let response = []
            result.forEach(function(item, index, array) {
                let coupon = datatype.json2json(item)
                console.log(coupon)
                response.push(coupon)
            });
            return response
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查完畢後使用優惠券(quantity -= 1)
    async useCoupon(){
        try{
            const sql = `update have set quantity = quantity - 1 where customerId = ${this.userId} and couponCode = "${this.code}";`
            console.log(sql)
            var result = await database.sqlConnection(sql)
            console.log(result)
            if (result["affectedRows"] != 0){
                this.state = 200
                return true
            }
            else{
                this.errorMessage = "未領取該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查優惠券日期是否超過活動日期
    async checkDateAvailableByName(){
        try{
            var eventDate = await database.sqlConnection(`select date from event where event.name = "${this.name}";`)
            console.log(eventDate)
            eventDate = eventDate[0]["date"]
            if (eventDate != null){
                eventDate = new Date(eventDate)
                console.log(eventDate)
                console.log(this._date)
                if (this._date > eventDate){
                    this.errorMessage = "到期日不符合限制"
                    this.state = 500
                    return false
                }
                else{
                    return true
                }
            }
            else{
                this.errorMessage = "找不到該活動"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查優惠券日期是否超過活動日期
    async checkDateAvailable(){
        try{
            var eventDate = await database.sqlConnection(`select E.date as date from event as E join coupon as C on E.name = C.eventName where C.code = "${this.code}"`)
            console.log(eventDate)
            eventDate = eventDate[0]["date"]
            if (eventDate != null){
                eventDate = new Date(eventDate)
                console.log(eventDate)
                console.log(this._date)
                if (this._date > eventDate){
                    this.errorMessage = "到期日不符合限制"
                    this.state = 500
                    return false
                }
                else{
                    return true
                }
            }
            else{
                this.errorMessage = "找不到該活動"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查完畢後新增優惠券
    async addNewCoupon() {
        const sqlInsert = `insert into coupon(code,eventName,date,discount,maxQuantity)value("${this.code}","${this.name}","${this.date}",${this.discount},${this.maxQuantity});`       
        console.log(sqlInsert)
        try{
            var result = await database.sqlConnection(sqlInsert)
            console.log(result)
            this.errorMessage = ""
            this.state = 200
            return true
        }catch(e){
            console.log(e)
            this.errorMessage = "優惠碼重複"
            this.state = 500
            return false
        }
    }

    //檢查完後查詢優惠券
    async searchCoupon() {
        const sqlSearch = `select C.code,C.date,C.discount,C.maxQuantity,C.eventName as name from coupon as C join event as E on C.eventName = E.name where E.organizerId = ${this.organizerId};`
        console.log(sqlSearch)
        try{
            var result = await database.sqlConnection(sqlSearch)
            console.log(result)
            let response = []
            result.forEach(function(item, index, array) {
                let coupon = datatype.json2json(item)
                console.log(coupon)
                response.push(coupon)
            });
            if (response.length == 0){
                return true
            }
            else {
                return response
            } 
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查完後更新優惠券
    async updateCoupon() {
        const sqlUpdate = `update coupon set date = "${this.date}",discount = "${this.discount}",maxQuantity = ${this.maxQuantity} where code = "${this.code}";`
        console.log(sqlUpdate)
        try{
            var result = await database.sqlConnection(sqlUpdate)
            console.log(result)
            if (result["affectedRows"] != 0){
                this.errorMessage = ""
                this.state = 200
                return true
            }
            else{
                console.log(e)
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "找不到該優惠券"
            this.state = 500
            return false
        }
    }

    //檢查完畢後刪除優惠券
    async deleteCoupon() {
        const sqlDelete = `delete from coupon where code = "${this.code}";`
        console.log(sqlDelete)
        try{
            var result = await database.sqlConnection(sqlDelete)
            console.log(result)
            if (result["affectedRows"] != 0){
                this.errorMessage = ""
                this.state = 200
                return true
            }
            else{
                console.log(e)
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "找不到該優惠券"
            this.state = 500
            return false
        }
    }

    //取得最大數量限制
    async getMaxQuantity() {
        try{
            var result = await database.sqlConnection(`select maxQuantity from coupon where code = "${this.code}";`)
            console.log(result)
            if (result.length != 0){
                this.maxQuantity = result[0]["maxQuantity"]
            }
            else{
                this.errorMessage = "找不到該優惠券"
                this.state = 500
                return false
            }
        }catch(e){
            console.log(e)
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查完畢領取優惠券
    async receiveCoupon() {
        const sqlInsert = `insert into have(customerId,couponCode,quantity)value(${this.userId},"${this.code}",${this.maxQuantity});`
        console.log(sqlInsert)
        try{
            var result = await database.sqlConnection(sqlInsert)
            console.log(result)
            this.errorMessage = ""
            this.state = 200
            return true
        }catch(e){
            console.log(e)
            this.errorMessage = "已領取過該優惠券"
            this.state = 500
            return false
        }
    }
}

module.exports = Coupon