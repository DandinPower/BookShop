import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'; 
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';        
import Logo from '../image/icon.jpg'
const Header = ({setSearchInfo}) => {
    const [search, setSearch] = useState();
    let userName = window.sessionStorage.getItem('userName')
    let userType = window.sessionStorage.getItem('type')
    let userAuthority = window.sessionStorage.getItem('authority')
    if(userName === null){
        userName = 'login'
    }

    const logOut=()=>{
        window.sessionStorage.clear()
        if(userAuthority !== null){
            window.location.href = `/member/adminlogin`
        }
        else{
            window.location.href = `/member/login`
        }
        
    }

    const TypeView =(accountType,accountAuthority)=>{
        if(accountType === 'customer'){
            return(<Nav>
                   <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                   <Nav.Link onClick={logOut}>登出</Nav.Link>
                   <Nav.Link href="/member/accountInfo">個人資訊</Nav.Link>
                   <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                   <Nav.Link href="/Products/shopcart">購物車</Nav.Link>
                   <Nav.Link href="/member/order">查看訂單</Nav.Link>
                   <Nav.Link href="/member/event/center">活動中心</Nav.Link>
                   </Nav>)
        }
        else if(accountType === 'business'){
            return(<Nav>
                <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                <Nav.Link onClick={logOut}>登出</Nav.Link>
                <Nav.Link href="/member/accountInfo">個人資訊</Nav.Link>
                <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                <Nav.Link href="/Products/business/manage">管理商品</Nav.Link>
                <Nav.Link href="/Products/business/manageorder">管理訂單</Nav.Link>
                <Nav.Link href="/member/event/center">活動中心</Nav.Link>
                </Nav>)
        }
        else if(accountAuthority === 'all'){
            return(<Nav>
                <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                <Nav.Link onClick={logOut}>登出</Nav.Link>
                <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                <Nav.Link href="/member/admin/manageCenter">帳號管理中心</Nav.Link>
                <Nav.Link href="/member/event/center">活動中心</Nav.Link>
                </Nav>)
        }
        else if(accountAuthority === 'event'){
            return(<Nav>
                <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                <Nav.Link onClick={logOut}>登出</Nav.Link>
                <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                <Nav.Link href="/member/event/center">活動中心</Nav.Link>
                </Nav>)
        }
        else if(accountAuthority === 'account'){
            return(<Nav>
                <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                <Nav.Link onClick={logOut}>登出</Nav.Link>
                <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                <Nav.Link href="/member/admin/manageCenter">帳號管理中心</Nav.Link>
                </Nav>)
        }
        else{
            return(<Nav>
                   <Nav.Link href="/member/login">login</Nav.Link>
                   <Nav.Link href="/Products/category">瀏覽產品</Nav.Link>
                   <Nav.Link href="/member/adminlogin">管理員登入</Nav.Link>
                   </Nav>)
        }
    }






    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/"> <img width="85" height="80"  src={Logo}  alt="logo" /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    {TypeView(userType,userAuthority)}
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="搜尋"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    />
                    <Link to='/Products/search'>
                        <Button variant="light" onClick={setSearchInfo(search)}>Search</Button>
                    </Link>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header

/*                    <Nav.Link onClick={logOut}>{logout}</Nav.Link>
                    <Nav.Link href="/member/accountInfo">個人資訊</Nav.Link>
                    <Nav.Link href="/Products/category">產品</Nav.Link>
                    <Nav.Link href="/Products/shopcart" disabled={userType !== 'customer'}>購物車</Nav.Link>
                    <Nav.Link href="/member/order" disabled={userType !== 'customer'}>order</Nav.Link>
                    <Nav.Link href="/Products/business/manage" disabled={userType !== 'business'}>管理商品</Nav.Link>
                    <Nav.Link href="/Products/business/manageorder" disabled={userType !== 'business'}>管理訂單</Nav.Link>
                    <Nav.Link href="/member/adminlogin">管理員登入</Nav.Link>
                    <Nav.Link href="/member/admin/manageCenter" >管理中心</Nav.Link>
                    <Nav.Link href="/member/event/center">活動中心</Nav.Link> */