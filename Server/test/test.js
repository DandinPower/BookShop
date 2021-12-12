let {assert} = require('chai');
const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const axios = require('axios')

describe('Account test', function(){ 
    it("Check whether registration is success in normal", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091234567",
            "address":"台南市安平區87號",
            "type":"customer"
        })
        assert.equal(res.data.state, 200);
    })
    it("Creat second account", async function(){
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin2",
            "userPassword": "admin2",
            "name":"test",
            "gender":"1",
            "email":"456@gmail.com",
            "phone":"079779797",
            "address":"北科宿舍冤魂",
            "type":"customer"
        })
        assert.equal(res.data.state, 200);
    })
})

describe('Account test Failed', function(){ 
    it("Check whether registration is failed if name is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin",
            "userPassword": "admin3",
            "name":"test",
            "gender":"1",
            "email":"000@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
    })

    it("Check whether registration is failed if Password is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin2",
            "userPassword": "admin",
            "name":"test",
            "gender":"1",
            "email":"000@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
    })

    it("Check whether registration is failed if email is repeated", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin3",
            "userPassword": "admin3",
            "name":"test",
            "gender":"1",
            "email":"123@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":"customer"
        })
        assert.equal(res.data.state, 500);
    })

    it("Check whether registration is failed if type is empty", async () =>{
        let res = await axios.post('http://localhost:5000/account/register/', {
            "userName":"admin3",
            "userPassword": "admin3",
            "name":"test",
            "gender":"1",
            "email":"000@gmail.com",
            "phone":"091213546",
            "address":"嘉義市自強街",
            "type":""
        })
        assert.equal(res.data.state, 500);
    })
})

