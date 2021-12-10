let {assert} = require('chai');
const express = require('express')
const database = require('../database/index')
const datatype = require('../function/datatype')
const axios = require('axios')

describe('test 1', function(){ 
    it("check if function a() return true", async function(){
        let res = await axios.post('http://localhost:5000/account/login', {
        "userName":"c",
        "userPassword":"123"
        })
        /*.catch(error => {
        })*/
        console.log(res.data.state)
        console.log("=====")
        assert.equal(res.data.state,200);   
    })
})

