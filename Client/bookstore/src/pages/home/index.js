import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from '../member/components/login'
import Register from '../member/components/register'
import Category from "../product/components/category";
import Header from "../../components/header"
import Product from "../product/components/product";
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
            <Route path="/Products/category" element={<Category setBookInfo={setBookInfo}/>}/>
            <Route path="/Products/product" element={<Product bookInfo={bookInfo}/>}/>
        </Routes>
    </BrowserRouter>
        
    )
}
export default Home