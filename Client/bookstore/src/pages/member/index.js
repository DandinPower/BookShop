import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import Login from '../member/components/login'
import Register from '../member/components/register'
const Member =()=>{
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/login">登入</Link></li>
                    </ul>
                </nav>
            </div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
        
    )
}
export default Member