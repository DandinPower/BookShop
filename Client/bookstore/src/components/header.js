import { Link } from "react-router-dom";
import Icon1 from "../image/icon.jpg";
const Header = () => {
    return (
        <div>
            <Link to="/"><img style = {{ width: '50px' ,height: '50px'}} src={Icon1} alt="icon"/></Link>
            <Link to="/member/login">登入</Link>
            <Link to="/Products">|產品</Link>
        </div>
    )
}
export default Header