import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from '../member/components/login'
import Register from '../member/components/register'
import Category from "../product/components/category";
import Header from "../../components/header"
import Product from "../product/components/product";
import AccountInfo from "../member/components/accountInfo";
import ShopCart from "../product/components/shopcart";
import Order from "../product/components/order";
import React, {useState} from 'react'

const Home = () => {
    const [bookInfo, setBookInfo] = useState();

    return (
        <BrowserRouter>
        <div>
            <Header/>
        </div>
        <Routes>
            <Route path="/" element={Home}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/register" element={<Register/>}/>
            <Route path="/member/accountInfo" element={<AccountInfo/>}/>
            <Route path="/Products/category" element={<Category setBookInfo={setBookInfo}/>}/>
            <Route path="/Products/product" element={<Product bookInfo={bookInfo}/>}/>
            <Route path="/Products/shopcart" element={<ShopCart/>}/>
            <Route path="/member/order" element={<Order/>}/>
        </Routes>
    </BrowserRouter>
        
    )
}
export default Home