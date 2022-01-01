const express = require('express')
const jwt = require('jsonwebtoken')
const database = require('../../database/index')
const datatype = require('../../function/datatype')
const file = require('../../function/file')
const router = express.Router()

class Event {

    //constructor
    constructor(req) {
        this.type = req.body.type
        this.userName = req.body.userName 
        this.name = req.body.name
        this.date = req.body.date
        this._date = new Date(this.date)
        this.discount = req.body.discount
        this.initialize()
    }

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

    //在新增或修改時檢查是否空白
    checkName() {
        if (this.name.length <= 0){
            this.errorMessage = "活動名不符合限制"
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

    //檢查所有輸入限制
    checkAll(){
        if (this.checkType() == false){
            return false
        }
        if (this.checkName() == false){
            return false
        }
        if (this.checkDate() == false){
            return false
        }
        if (this.checkDiscount() == false){
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

    //查詢所有活動
    async getAllEvent() {
        const sqlSearch = `select E.organizerId,A.name as organizerName,E.name,E.date from event as E join organizer as O on E.organizerId = O.organizerId left join business as B on B.organizerId = O.organizerId left join account as A on A.id = B.id;`
        console.log(sqlSearch)
        try{
            var result = await database.sqlConnection(sqlSearch)
            console.log(result)
            let response = []
            result.forEach(function(item, index, array) {
                let event = datatype.json2json(item)
                if (event["organizerName"] == null){
                    event["organizerName"] = "管理員"
                }
                console.log(event)
                response.push(event)
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
}

module.exports = Event