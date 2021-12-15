const puppeteer = require('puppeteer');
let {assert, should} = require('chai');
const express = require('express');
const database = require('../database/index');
const datatype = require('../function/datatype');
const axios = require('axios');


describe('Register account test', function(){
    before(async ()=> {
        msg = ''
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('http://localhost:3000/');
        

        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });

        userName = '#root > div.register > table > tbody > tr:nth-child(1) > td > input[type=text]'
        Name = '#root > div.register > table > tbody > tr:nth-child(2) > td > input[type=text]'
        Email = '#root > div.register > table > tbody > tr:nth-child(3) > td > input[type=text]'
        Password = '#root > div.register > table > tbody > tr:nth-child(4) > td > input[type=password]'
        radioMan = '#root > div.register > table > tbody > tr:nth-child(5) > td > input[type=radio]:nth-child(1)'
        Phone = '#root > div.register > table > tbody > tr:nth-child(6) > td > input[type=tel]'
        Address = '#root > div.register > table > tbody > tr:nth-child(7) > td > input[type=text]'
        Type = '#root > div.register > table > tbody > tr:nth-child(8) > td > select'
        Register = '#root > div.register > button'

        login_userName = '#root > div.login > div:nth-child(2) > p > input[type=text]'
        login_Password = '#root > div.login > div:nth-child(3) > p > input[type=password]'
        Login = '#root > div.login > div:nth-child(4) > button'

        Logout = '#navbarScroll > div > a:nth-child(2)'
        Navbar = '#root > div:nth-child(1) > nav'
    });

    after(async ()=>{
        await browser.close();
    })

    it("Check whether first customer c1 registration is success in normal", async () => {
        await database.sqlConnection('delete from `account`');
        await database.sqlConnection('delete from `customer`');
        await database.sqlConnection('delete from `business`');
        
        await page.click('#navbarScroll > div > a:nth-child(1)') //點選Login
        await page.waitForSelector('#root > div.login > div:nth-child(4) > nav > li > a') //等待頁面跳轉
        await page.click('#root > div.login > div:nth-child(4) > nav > li > a') // 進入註冊畫面

        await page.waitForSelector(userName);
        await page.type(userName, 'c1'); 
        await page.type(Name, 'customer1');
        await page.type(Email, 'customer1@gmail.com');
        await page.type(Password, 'c1');
        await page.click(radioMan); 
        await page.type(Phone, '0912345671');
        await page.type(Address, '嘉義市');
        await page.click(Register);
        await page.screenshot({path: "fuck.png"})
        

        await page.waitForTimeout(1000); //稍微等待後再關閉

        //assert.equal(msg, '註冊成功')
    })

    /*it('Check whether first customer c1 login is success in normal', async () => {
        await page.click('#navbarScroll > div > a:nth-child(1)') //點選Login 
        await page.waitForSelector(login_userName);
        await page.type(login_userName, 'c1');      
        await page.type(login_Password, 'c1');       
        await page.click(Login);

        await page.waitForSelector('#navbarScroll > div > a.nav-link.disabled');//稍微等待後再關閉

        assert.equal(msg, '登入成功')
    })*/

    /*c3
    "userName":"c3",
    "userPassword": "c3",
    "name":"customer3",
    "gender":"1",
    "email":"customer3@gmail.com",
    "phone":"0912135461",
    "address":"嘉義市自強街",
    "type":"customer"
    */
    /*it("Check whether first customer c3 registration is success if userName is repeated", async () => {   
        console.log(msg)
        
        await page.click(Logout) //點選Login
        await page.waitForSelector('#root > div.login > div:nth-child(4) > nav > li > a') //等待頁面跳轉        
        r = '#root > div.login > div:nth-child(4) > nav > li > a'
        await page.click(r) // 進入註冊畫面
        
        
        
        await page.waitForSelector(userName);
        await page.type(userName, 'c1'); 
        await page.type(Name, 'customer3');
        await page.type(Email, 'customer3@gmail.com');
        await page.type(Password, 'c3');
        await page.click(radioMan); 
        await page.type(Phone, '0912135461');
        await page.type(Address, '中山區');
        await page.click(Register);
        
        await page.screenshot({path: 'fuck123456.png'})
        await page.waitForSelector('#root > div:nth-child(1) > nav'); //稍微等待後再關閉

        assert.equal(msg, '註冊失敗')
    })*/
});

