import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from '../member/components/login'
import Register from '../member/components/register'
import Category from "../product/components/category";
import Header from "../../components/header"
import Product from "../product/components/product";
import AccountInfo from "../member/components/accountInfo";
import ShopCart from "../product/components/shopcart";
import Order from "../product/components/order";
import HomeContent from "./homecontent";
import ManageProduct from "../product/components/business/manageProduct";
import AddProduct from "../product/components/business/addProduct";
import UpdateProduct from "../product/components/business/updateProduct";
import ManageOrder from "../product/components/business/manageOrder";
import UpdataOrder from "../product/components/business/updateOrder";
import OrderComment from "../product/components/orderComment";
import OrderInfo from "../product/components/orderInfo";
import AdminLogin from "../member/components/admin/adminLogin";
import ManageAccountCenter from "../member/components/admin/manageAccountCenter";
import ManageBusinessAccount from "../member/components/admin/manageBusinessAccount";
import ManageCustomerAccount from "../member/components/admin/manageCustomerAccount";
import ManageAccount from "../member/components/admin/manageAccount";
import EventCenter from "../member/components/event/eventCenter";
import React, {useState} from 'react';

const Home = () => {
    const [bookInfo, setBookInfo] = useState(['']);
    const [productInfo, setProductInfo] = useState(['']);
    const [orderInfo, setOrderInfo] = useState(['']);
    const [clientOrderInfo,setClientOrderInfo] = useState(['']);
    const [checkOrderInfo,setCheckOrderInfo] = useState(['']);
    const [accountInfo,setAccountInfo] = useState(['']);
    return (
        <BrowserRouter>
        <div>
            <Header/>
            <br size="lg"/>
            <br size="lg"/>
            <br size="lg"/>
        </div>
        <Routes>
            <Route path="/" element={<HomeContent setBookInfo={setBookInfo}/>}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/adminlogin" element={<AdminLogin/>}/>
            <Route path="/member/admin/manageCenter" element={<ManageAccountCenter/>}/>
            <Route path="/member/admin/manageBusiness" element={<ManageBusinessAccount setAccountInfo={setAccountInfo}/>}/>
            <Route path="/member/admin/manageCustomer" element={<ManageCustomerAccount setAccountInfo={setAccountInfo}/>}/>
            <Route path="/member/admin/manageAccount" element={<ManageAccount accountInfo={accountInfo}/>}/>
            <Route path="/member/event/center" element={<EventCenter/>}/>
            <Route path="/member/register" element={<Register/>}/>
            <Route path="/member/accountInfo" element={<AccountInfo/>}/>
            <Route path="/Products/category" element={<Category setBookInfo={setBookInfo}/>}/>
            <Route path="/Products/product" element={<Product bookInfo={bookInfo} setCheckOrderInfo={setCheckOrderInfo}/>}/>
            <Route path="/Products/shopcart" element={<ShopCart setCheckOrderInfo={setCheckOrderInfo}/>}/>
            <Route path="/Products/orderInfo" element={<OrderInfo checkOrderInfo={checkOrderInfo}/>}/>
            <Route path="/member/order" element={<Order setClientOrderInfo={setClientOrderInfo}/>}/>
            <Route path="/Products/business/manage" element={<ManageProduct setProductInfo={setProductInfo}/>}/>
            <Route path="/Products/business/addproduct" element={<AddProduct/>}/>
            <Route path="/Products/business/updateproduct" element={<UpdateProduct productInfo={productInfo}/>}/>
            <Route path="/Products/business/manageorder" element={<ManageOrder setOrderInfo={setOrderInfo}/>}/>
            <Route path="/Products/business/updateorder" element={<UpdataOrder orderInfo={orderInfo}/>}/>
            <Route path="/Products/ordercomment" element={<OrderComment clientOrderInfo={clientOrderInfo}/>}/>
        </Routes>
    </BrowserRouter>
        
    )
}
export default Home