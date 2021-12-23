const puppeteer = require('puppeteer');
let {assert, should} = require('chai');
const express = require('express');
const database = require('../database/index');
const datatype = require('../function/datatype');
const axios = require('axios');
msg = ''

//CSS selector
const userName = '#root > div.register > table > tbody > tr:nth-child(1) > td > input[type=text]'
const Name = '#root > div.register > table > tbody > tr:nth-child(2) > td > input[type=text]'
const Email = '#root > div.register > table > tbody > tr:nth-child(3) > td > input[type=text]'
const Password = '#root > div.register > table > tbody > tr:nth-child(4) > td > input[type=password]'
const radioMan = '#root > div.register > table > tbody > tr:nth-child(5) > td > input[type=radio]:nth-child(1)'
const Phone = '#root > div.register > table > tbody > tr:nth-child(6) > td > input[type=tel]'
const Address = '#root > div.register > table > tbody > tr:nth-child(7) > td > input[type=text]'
const Type = '#root > div.register > table > tbody > tr:nth-child(8) > td > select'
const Register = '#root > div.register > button'

const login_userName = '#root > div.login > div:nth-child(2) > p > input[type=text]'
const login_Password = '#root > div.login > div:nth-child(3) > p > input[type=password]'
const Login = '#root > div.login > div:nth-child(4) > button'

const Logout = '#navbarScroll > div > a:nth-child(2)'
const Navbar = '#root > div:nth-child(1) > nav'


const c1_userName = 'cus1';
const c1_Name = 'customer1';
const c1_Password = 'cus1';
const c1_Email = 'customer1@gmail.com';
const c1_Phone = '0912345671';
const c1_Address = '嘉義市';

const c2_userName = 'cus2';
const c2_Name = 'customer2';
const c2_Password = 'cus2';
const c2_Email = 'customer2@gmail.com';
const c2_Phone = '0911111111';
const c2_Address = '嘉義市';

const c3_userName = 'cus3';
const c3_Name = 'customer3';
const c3_Password = 'cus3';
const c3_Email = 'customer3@gmail.com';
const c3_Phone = '0912135461';
const c3_Address = '中山區';

const b1_userName = 'bus1';
const b1_Name = 'business1';
const b1_Password = 'bus1';
const b1_Email = 'business1@gmail.com';
const b1_Phone = '0907979797';
const b1_Address = '台北市';

const b3_userName = 'bus3';
const b3_Name = 'business3';
const b3_Password = 'bus3';
const b3_Email = 'business3@gmail.com';
const b3_Phone = '0978978971';
const b3_Address = '台北市';


describe('Customer Register test', async() => {
    before(async() =>{
        await database.sqlConnection('delete from `account`');
        await database.sqlConnection('delete from `customer`');
        await database.sqlConnection('delete from `business`');
    })

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
        await page.waitForSelector(userName);
        await page.type(userName, c1_userName); 
        await page.type(Name, c1_Name);
        await page.type(Email, c1_Email);
        await page.type(Password, c1_Password);
        await page.click(radioMan); 
        await page.type(Phone, c1_Phone);
        await page.type(Address, c1_Address);
        await page.click(Register);
        
        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '註冊成功')
    })

    it("Check whether customer c2 registration is success in address repeated", async () => {
        await page.waitForSelector(userName);
        await page.type(userName, c2_userName); 
        await page.type(Name, c2_Name);
        await page.type(Email, c2_Email);
        await page.type(Password, c2_Password);
        await page.click(radioMan); 
        await page.type(Phone, c2_Phone);
        await page.type(Address, c2_Address);
        await page.click(Register);
        
        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '註冊成功')
    })

    it("Check whether customer c3 registration is failed if userName is repeated", async () => {  
        
        await page.type(userName, c1_userName)
        await page.type(Name, c3_Name);
        await page.type(Email, c3_Email);
        await page.type(Password, c3_Password);
        await page.click(radioMan); 
        await page.type(Phone, c3_Phone);
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')
    })

    it("Check whether customer c3 registration is failed if Email is repeated", async () =>{
        await page.type(userName, c3_userName)
        await page.type(Name, c3_Name);
        await page.type(Email, c1_Email);
        await page.type(Password, c3_Password);
        await page.click(radioMan); 
        await page.type(Phone, c3_Phone);
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')   
    })

    it("Check whether customer c3 registration is failed if Phone is repeated", async () =>{
        await page.type(userName, c3_userName)
        await page.type(Name, c3_Name);
        await page.type(Email, c3_Email);
        await page.type(Password, c3_Password);
        await page.click(radioMan); 
        await page.type(Phone, c1_Phone);
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')   
    })

    it("Check whether customer c3 registration is failed if Phone is not  10 digits", async () =>{
        await page.type(userName, c3_userName)
        await page.type(Name, c3_Name);
        await page.type(Email, c3_Email);
        await page.type(Password, c3_Password);
        await page.click(radioMan); 
        await page.type(Phone, '091213546');
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '電話號碼請等於10位數'); 
    })

    it("Check whether customer c3 registration is failed if Password is empty", async () =>{
        await page.type(userName, c3_userName)
        await page.type(Name, c3_Name);
        await page.type(Email, c3_Email);
        await page.type(Password, '');
        await page.click(radioMan); 
        await page.type(Phone, c1_Phone);
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '密碼長度要大於3')   
    })
    
    it("Check whether customer c3 registration is failed if userName is empty", async () =>{
        await page.type(userName, '')
        await page.type(Name, c3_Name);
        await page.type(Email, c3_Email);
        await page.type(Password, c3_Password);
        await page.click(radioMan); 
        await page.type(Phone, c1_Phone);
        await page.type(Address, c3_Address);   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '帳號長度要大於3')   
    })
});

describe('Customer Login test', async() => {
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

    
    it('Check whether customer c1 login is success in normal', async () => {
        await page.waitForSelector(login_userName);
        await page.type(login_userName, c1_userName);      
        await page.type(login_Password, c1_Password);       
        await page.click(Login);

        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '登入成功')
    })
   
    it("Check whether customer c3 login is failed if account is not exist", async () => { 
        await page.waitForSelector(login_userName);
        await page.type(login_userName, c3_userName);      
        await page.type(login_Password, c3_userName);       
        await page.click(Login);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '登入失敗')
    })
})

describe('Customer Search test', async () => {
    before(async ()=> {
        let Info_userName = '';
        let Info_Email = '';
        let Info_Phone = '';
        let Info_Password = '';
        const accInfo = '#navbarScroll > div > a:nth-child(3)'
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('http://localhost:3000/member/login')
        
        page.on('dialog', async dialog => {
            msg = dialog.message();
            await dialog.accept();
        });

        await page.waitForSelector(login_userName);
        await page.type(login_userName, c1_userName);      
        await page.type(login_Password, c1_Password);       
        await page.click(Login);
        await page.waitForNavigation(); 
        await page.click(accInfo);
        await page.waitForNavigation(); 
    });

    after(async ()=>{
        await browser.close();
    })


    it('Check whether c1 account userName is correct', async () => {
        await page.waitForSelector('#root > table > tbody > tr:nth-child(3) > td > input[type=text]');
        Selector_Info_userName = '#root > table > tbody > tr:nth-child(3) > td > input[type=text]'
        Info_userName = await page.$(Selector_Info_userName);
        Info_userName = await Info_userName .getProperty('value');
        Info_userName = await Info_userName .jsonValue();

        assert.equal(Info_userName, c1_Name);
    })

    it('Check whether c1 account Email is correct', async () => {
        Selector_Info_Email = '#root > table > tbody > tr:nth-child(5) > td > input[type=text]'
        Info_Email = await page.$(Selector_Info_Email)
        Info_Email = await Info_Email .getProperty('value');
        Info_Email  = await Info_Email .jsonValue();

        assert.equal(Info_Email , c1_Email);
    })

    it('Check whether c1 account Phone is correct', async () => {
        Selector_Info_Phone= '#root > table > tbody > tr:nth-child(6) > td > input[type=text]'
        Info_Phone = await page.$(Selector_Info_Phone)
        Info_Phone= await Info_Phone .getProperty('value');
        Info_Phone  = await Info_Phone .jsonValue();

        assert.equal(Info_Phone , c1_Phone);
    })

    it('Check whether c1 account Password is correct', async () => {
        Selector_Info_Password = '#root > table > tbody > tr:nth-child(2) > td > input[type=text]'
        Info_Password = await page.$(Selector_Info_Password)
        Info_Password = await Info_Password.getProperty('value');
        Info_Password  = await Info_Password.jsonValue();

        assert.equal(Info_Password , c1_Password);
    })
    
})

describe('Business Register test', async() => {
    let type_select = '#root > div.register > table > tbody > tr:nth-child(8) > td > select'
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

    it("Check whether first business b1 registration is success in normal", async () => {
        await page.waitForSelector(userName);
        await page.type(userName, b1_userName); 
        await page.type(Name, b1_Name);
        await page.type(Email, b1_Email);
        await page.type(Password, b1_Password);
        await page.click(radioMan); 
        await page.type(Phone, b1_Phone);
        await page.type(Address, b1_Address);
        await page.select(type_select, "business")
        await page.click(Register);
        
        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '註冊成功')
    })

    it("Check whether business b3 registration is failed if userName is repeated", async () => {  
        
        await page.type(userName, b1_userName)
        await page.type(Name, b3_Name);
        await page.type(Email, b3_Email);
        await page.type(Password, b3_Password);
        await page.click(radioMan); 
        await page.type(Phone, b3_Phone);
        await page.type(Address, b3_Address);
        await page.select(type_select, "business")   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')
    })

    it("Check whether business b3 registration is failed if Email is repeated", async () =>{
        await page.type(userName, b3_userName)
        await page.type(Name, b3_Name);
        await page.type(Email, b1_Email);
        await page.type(Password, b3_Password);
        await page.click(radioMan); 
        await page.type(Phone, b3_Phone);
        await page.type(Address, b3_Address); 
        await page.select(type_select, "business")    
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')   
    })

    it("Check whether customer c3 registration is failed if Phone is repeated", async () =>{
        await page.type(userName, b3_userName)
        await page.type(Name, b3_Name);
        await page.type(Email, b3_Email);
        await page.type(Password, b3_Password);
        await page.click(radioMan); 
        await page.type(Phone, b1_Phone);
        await page.type(Address, b3_Address); 
        await page.select(type_select, "business")    
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '網路連線錯誤')   
    })

    it("Check whether customer c3 registration is failed if Phone is not  10 digits", async () =>{
        await page.type(userName, b3_userName)
        await page.type(Name, b3_Name);
        await page.type(Email, b3_Email);
        await page.type(Password, b3_Password);
        await page.click(radioMan); 
        await page.type(Phone, '090000000');
        await page.type(Address, b3_Address);   
        await page.select(type_select, "business")  
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '電話號碼請等於10位數'); 
    })

    it("Check whether customer c3 registration is failed if Password is empty", async () =>{
        await page.type(userName, b3_userName)
        await page.type(Name, b3_Name);
        await page.type(Email, b3_Email);
        await page.type(Password, '');
        await page.click(radioMan); 
        await page.type(Phone, b1_Phone);
        await page.type(Address, b3_Address);
        await page.select(type_select, "business")     
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '密碼長度要大於3')   
    })
    
    it("Check whether customer c3 registration is failed if userName is empty", async () =>{
        await page.type(userName, '')
        await page.type(Name, b3_Name);
        await page.type(Email, b3_Email);
        await page.type(Password, b3_Password);
        await page.click(radioMan); 
        await page.type(Phone, b3_Phone);
        await page.type(Address, b3_Address);  
        await page.select(type_select, "business")   
        await page.click(Register);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '帳號長度要大於3')   
    })
});

describe('Business Login test', async() => {
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

    
    it('Check whether business b1 login is success in normal', async () => {
        await page.waitForSelector(login_userName);
        await page.type(login_userName, b1_userName);      
        await page.type(login_Password, b1_Password);       
        await page.click(Login);

        await page.waitForNavigation(); //稍微等待後再關閉
        assert.equal(msg, '登入成功')
    })
   
    it("Check whether business b1 login is failed if account is not exist", async () => { 
        await page.waitForSelector(login_userName);
        await page.type(login_userName, b3_userName);      
        await page.type(login_Password, b3_userName);       
        await page.click(Login);
        
        await page.waitForTimeout(100); //稍微等待後再關閉
        assert.equal(msg, '登入失敗')
    })
})

describe('Business Search test', async () => {
    before(async ()=> {
        const accInfo = '#navbarScroll > div > a:nth-child(3)'
        let Info_userName = '';
        let Info_Email = '';
        let Info_Phone = '';
        let Info_Password = '';

        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('http://localhost:3000/member/login')
        
        page.on('dialog', async dialog => {
            msg = dialog.message();
            await dialog.accept();
        });


        //b1 account login
        await page.waitForSelector(login_userName);
        await page.type(login_userName, b1_userName);      
        await page.type(login_Password, b1_Password);       
        await page.click(Login);
        await page.waitForNavigation(); 
        await page.click(accInfo);
        await page.waitForNavigation(); 
    });

    after(async ()=>{
        await browser.close();
    })


    it('Check whether b1 account userName is correct', async () => {
        Selector_Info_userName = '#root > table > tbody > tr:nth-child(3) > td > input[type=text]'
        await page.waitForSelector(Selector_Info_userName);
        await page.screenshot({path: "1.png"})
        Info_userName = await page.$(Selector_Info_userName);
        Info_userName = await Info_userName.getProperty('value');
        Info_userName = await Info_userName.jsonValue();

        assert.equal(Info_userName, b1_Name);
    })

    it('Check whether b1 account Email is correct', async () => {
        Selector_Info_Email = '#root > table > tbody > tr:nth-child(5) > td > input[type=text]'
        await page.waitForSelector(Selector_Info_Email);
        Info_Email = await page.$(Selector_Info_Email)
        Info_Email = await Info_Email.getProperty('value');
        Info_Email  = await Info_Email.jsonValue();
       
        assert.equal(Info_Email , b1_Email);
    })

    it('Check whether b1 account Phone is correct', async () => {
        Selector_Info_Phone= '#root > table > tbody > tr:nth-child(6) > td > input[type=text]'
        await page.waitForSelector(Selector_Info_Phone);
        Info_Phone = await page.$(Selector_Info_Phone)
        Info_Phone= await Info_Phone.getProperty('value');
        Info_Phone  = await Info_Phone.jsonValue();

        assert.equal(Info_Phone , b1_Phone);
    })

    it('Check whether b1 account Password is correct', async () => {
        Selector_Info_Password = '#root > table > tbody > tr:nth-child(2) > td > input[type=text]'
        await page.waitForSelector(Selector_Info_Password);
        Info_Password = await page.$(Selector_Info_Password)
        Info_Password = await Info_Password.getProperty('value');
        Info_Password  = await Info_Password.jsonValue();

        assert.equal(Info_Password , b1_Password);
    })
})