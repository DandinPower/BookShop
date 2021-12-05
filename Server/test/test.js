let {assert} = require('chai');
const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const axios = require('axios')
/*
describe('test 1', function(){ 
    var name = ""
    axios.post('http://localhost:5000/account/login', {
    "userName":"dandinTest",
    "userPassword":"cs383838"
    })
    .then(res => {
        console.log("成功")
        name = res.data.name
        console.log(name)
    })
    .catch(error => {
    })
    it("check if function a() return true", function(){
        assert.equal(name,"test" ,"比對帳戶名稱");   
    })}         
)*/

