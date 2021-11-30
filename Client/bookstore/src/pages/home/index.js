import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from '../member/components/login'
import Register from '../member/components/register'
import Products from "../product/components/products";
import Header from "../../components/header"

const Home = () => {
    return (
        <BrowserRouter>
        <div>
            <Header/>
        </div>
        <Routes>
            <Route path="/" element={Home}/>
            <Route path="/member/login" element={<Login/>}/>
            <Route path="/member/register" element={<Register/>}/>
            <Route path="/Products" element={<Products/>}/>
        </Routes>
    </BrowserRouter>
        
    )
}
export default Home