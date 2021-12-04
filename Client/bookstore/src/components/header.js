import { Link } from "react-router-dom";
import {useState,useEffect } from "react/cjs/react.development";
import Icon1 from "../image/icon.jpg";
const Header = () => {
    const [state, setstate] = useState('');
    useEffect(() => {
        setstate(window.sessionStorage.getItem('userName')) 
      }, [])
    return (
        <div>
            <Link to="/"><img style = {{ width: '50px' ,height: '50px'}} src={Icon1} alt="icon"/></Link>
            <Link to="/member/login">登入</Link>
            <Link to="/member/accountInfo">|個人資訊</Link>
            <Link to="/Products/category">|產品</Link>
            <p>{state}</p>
        </div>
    )
}
export default Header