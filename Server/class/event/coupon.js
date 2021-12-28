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

    //檢查優惠券日期是否超過活動日期
    async checkDateAvailable(){
        try{
            var eventDate = await database.sqlConnection(`select date from event where name = "${this.name}" and organizerId = ${this.organizerId};`)
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
            this.errorMessage = "網路連線失敗"
            this.state = 500
            return false
        }
    }

    //檢查完畢後新增優惠券
    async addNewCoupon() {
        const sqlInsert = `insert into coupon(code,eventName,organizerId,date,discount,maxQuantity)value("${this.code}","${this.name}",${this.organizerId},"${this.date}",${this.discount},${this.maxQuantity});`       
        console.log(sqlInsert)
        try{
            var result = await database.sqlConnection(sqlInsert)
            console.log(result)
            this.errorMessage = ""
            this.state = 200
            return true
        }catch(e){
            console.log(e)
            this.errorMessage = "活動名不符合限制"
            this.state = 500
            return false
        }
    }

    //檢查完後查詢優惠券
    async searchCoupon() {
        const sqlSearch = `select code,date,discount,maxQuantity from coupon where organizerId = ${this.organizerId} and eventName = "${this.name}";`
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

    //檢查完後更新優惠券
    async updateCoupon() {
        const sqlUpdate = `update coupon set date = "${this.date}",discount = "${this.discount}",maxQuantity = ${this.maxQuantity} where organizerId = ${this.organizerId} and eventName = "${this.name}" and code = "${this.code}";`
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
        const sqlDelete = `delete from coupon where code = "${this.code}" and eventName = "${this.name}" and organizerId = ${this.organizerId};`
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
}

module.exports = Coupon