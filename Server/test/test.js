const puppeteer = require('puppeteer');
let {assert, should} = require('chai');
const express = require('express');
const database = require('../database/index');
const datatype = require('../function/datatype');
const axios = require('axios');

//CSS selector
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
msg = ''

describe('Register test', function(){
    beforeEach(async ()=> {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('http://localhost:3000/member/register');
        

        page.on('dialog', async dialog => {
            msg = dialog.message();
            await dialog.accept();
        });
    });

    afterEach(async ()=>{
        await browser.close();
    })

    it("Check whether first customer c1 registration is success in normal", async () => {
        await database.sqlConnection('delete from `account`');
        await database.sqlConnection('delete from `customer`');
        await database.sqlConnection('delete from `business`');

        await page.screenshot({path : "1.png"})
        await page.waitForSelector(userName);
        await page.type(userName, 'cus1'); 
        await page.type(Name, 'customer1');
        await page.type(Email, 'customer1@gmail.com');
        await page.type(Password, 'cus1');
        await page.click(radioMan); 
        await page.type(Phone, '0912345671');
        await page.type(Address, '嘉義市');
        await page.click(Register);
        
        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '註冊成功')
    })

    it("Check whether customer c3 registration is failed if userName is repeated", async () => {  
        
        await page.type(userName, 'cus1')
        await page.type(Name, 'customer3');
        await page.type(Email, 'customer3@gmail.com');
        await page.type(Password, 'cus3');
        await page.click(radioMan); 
        await page.type(Phone, '0912135461');
        await page.type(Address, '中山區');   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '註冊失敗')
    })

    it("Check whether customer c3 registration is failed if Email is repeated", async () =>{
        await page.type(userName, 'cus3')
        await page.type(Name, 'customer3');
        await page.type(Email, 'customer1@gmail.com');
        await page.type(Password, 'cus3');
        await page.click(radioMan); 
        await page.type(Phone, '0912135461');
        await page.type(Address, '中山區');
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '註冊失敗')   
    })

    it("Check whether customer c3 registration is failed if Phone is repeated", async () =>{
        await page.type(userName, 'cus3')
        await page.type(Name, 'customer3');
        await page.type(Email, 'customer3@gmail.com');
        await page.type(Password, 'cus3');
        await page.click(radioMan); 
        await page.type(Phone, '0912345671');
        await page.type(Address, '中山區');
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '註冊失敗')   
    })

    it("Check whether customer c3 registration is failed if Phone is not  10 digits", async () =>{
        await page.type(userName, 'cus3')
        await page.type(Name, 'customer3');
        await page.type(Email, 'customer3@gmail.com');
        await page.type(Password, 'cus3');
        await page.click(radioMan); 
        await page.type(Phone, '091213546');
        await page.type(Address, '中山區');
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '電話號碼不符合10位數'); 
    })

});

describe('Login test', function(){
    beforeEach(async ()=> {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('http://localhost:3000/member/login')

        page.on('dialog', async dialog => {
            msg = dialog.message();
            await dialog.accept();
        });
    });

    afterEach(async ()=>{
        await browser.close();
    })

    
    it('Check whether first customer c1 login is success in normal', async () => {
        await page.waitForSelector(login_userName);
        await page.type(login_userName, 'cus1');      
        await page.type(login_Password, 'cus1');       
        await page.click(Login);

        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '登入成功')
    })
   
    it("Check whether customer c3 login is failed if account is not exist", async () => { 
        //await page.click('#navbarScroll > div > a:nth-child(1)')
        await page.waitForSelector(login_userName);
        await page.type(login_userName, 'cus3');      
        await page.type(login_Password, 'cus3');       
        await page.click(Login);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '登入失敗')
    })
})
