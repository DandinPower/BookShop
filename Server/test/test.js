let {assert, should} = require('chai');
const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const axios = require('axios')

//初次創建測試 建立c1 c2 b1的帳戶
describe('Account test', function(){ 
    it("Check whether first customer registration is success in normal", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c1",
            "userPassword": "c1",
            "name":"customer1",
            "gender":"1",
            "email":"customer1@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "type":"customer"
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.error, "");
    })
    it("Creat whether second customer registration is success if Password is repeated", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c2",
            "userPassword": "c1",
            "name":"customer2",
            "gender":"1",
            "email":"customer2@gmail.com",
            "phone":"079779797",
            "address":"北科宿舍冤魂",
            "type":"customer"
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.error, "");
    })

    it("Creat whether first business registration is success in normal", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b1",
            "userPassword": "b1",
            "name":"business1",
            "gender":"1",
            "email":"business1@gmail.com",
            "phone":"012145464",
            "address":"信義區",
            "type":"business"
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.error, "");
    })

    it("Creat whether first business registration is success if Password is repeated", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b2",
            "userPassword": "b1",
            "name":"business2",
            "gender":"1",
            "email":"business2@gmail.com",
            "phone":"045444444",
            "address":"中山區",
            "type":"business"
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.error, "");
    })
})

//Customer創建失敗測試 嘗試建立c3的帳戶
describe('Customer test Failed', function(){ 
    it("Check whether registration is failed if userName is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c1",
            "userPassword": "c3",
            "name":"customer3",
            "gender":"1",
            "email":"customer3@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })


    it("Check whether registration is failed if email is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c3",
            "userPassword": "c3",
            "name":"customer3",
            "gender":"1",
            "email":"customer1@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })


    /*it("Check whether registration is failed if phone is empty", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c3",
            "userPassword": "c3",
            "name":"customer3",
            "gender":"1",
            "email":"customer3@gmail.com",
            "phone":"",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })*/

    it("Check whether registration is failed if phone is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c3",
            "userPassword": "c3",
            "name":"customer3",
            "gender":"1",
            "email":"customer3@gmail.com",
            "phone":"091234567",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })


    it("Check whether registration is failed if type is empty", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"c3",
            "userPassword": "c3",
            "name":"customer3",
            "gender":"1",
            "email":"customer3@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":""
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "未指定用戶類別");
    })
})

//Business失敗測試 嘗試建立b3的帳戶
describe('Business test Failed', function(){ 
    it("Check whether registration is failed if userName is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b1",
            "userPassword": "b3",
            "name":"business3",
            "gender":"1",
            "email":"business3@gmail.com",
            "phone":"097533253",
            "address":"中國西山省",
            "type":"business"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })


    it("Check whether registration is failed if email is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b3",
            "userPassword": "b1",
            "name":"business3",
            "gender":"1",
            "email":"business1@gmail.com",
            "phone":"097533253",
            "address":"中國西山省",
            "type":"business"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })

    it("Check whether registration is failed if phone is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b3",
            "userPassword": "b3",
            "name":"business3",
            "gender":"1",
            "email":"business1@gmail.com",
            "phone":"012145464",
            "address":"中國西山省",
            "type":"business"
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "註冊失敗");
    })

    it("Check whether registration is failed if type is empty", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"b3",
            "userPassword": "b1",
            "name":"business3",
            "gender":"1",
            "email":"business1@gmail.com",
            "phone":"097533253",
            "address":"中國西山省",
            "type":""
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "未指定用戶類別");
    })
})


//登入測試
describe('Login test', function(){ 
    it("Check whether customer login is success in normal", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "c1",
            "userPassword": "c1",
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.type, "customer");
        assert.equal(res.data.name, "customer1");
        assert.notEqual(res.data.token, "");
    })

    it("Check whether customer login is failed if userPassword is not correct", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "c1",
            "userPassword": "c3",
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "登入失敗");
    })

    //目前因為會插入資料庫 所以會顯示登入成功
    it("Check whether customer login is failed if userName and userPassword are not exist", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "c3",
            "userPassword": "c3",
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "登入失敗");
    })

    it("Check whether business login is success in normal ", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "b1",
            "userPassword": "b1",
        })
        assert.equal(res.data.state, 200);
        assert.equal(res.data.type, "business");
        assert.equal(res.data.name, "business1");
        assert.notEqual(res.data.token, "");
    })

    it("Check whether business login is failed if userPassword is not correct", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "b1",
            "userPassword": "b3",
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "登入失敗");
    })

    it("Check whether business login is failed if userName and userPassword are not exist", async () =>{
        let res = await axios.post('http://localhost:5000/account/login/', {
            "userName": "b3",
            "userPassword": "b3",
        })
        assert.equal(res.data.state, 500);
        assert.equal(res.data.error, "登入失敗");
    })
})

