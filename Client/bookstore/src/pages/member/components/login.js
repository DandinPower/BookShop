import {Link} from 'react-router-dom';
const Login = () => {
    return <div>
        <h1>會員登入</h1>
        <input type='text' name='ID' placeholder='請輸入帳號'></input>
        <br/>
        <br/>
        <input type='password' name='Password' placeholder='請輸入密碼'></input>
        <br/>
        <br/>
        <button>登入</button>
        <nav>
            <li><Link to="/register">註冊</Link></li>
        </nav>
        
    </div>
}
export default Login