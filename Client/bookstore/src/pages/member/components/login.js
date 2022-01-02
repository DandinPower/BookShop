import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import "./css.css"

import 'bootstrap/dist/css/bootstrap.min.css';        
const Login = () => {
    const [id,setID] = useState('')
    const [password,setPassword] = useState('')
    const submit = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/account/login/',
            data:{
              userName: id,
              userPassword: password,
            }
          }).then((response) => {
            console.log(response.data);
            if(response.data.state === '200'){
                window.sessionStorage.setItem('name',response.data.name)
                window.sessionStorage.setItem('userName',response.data.userName)
                window.sessionStorage.setItem('token',response.data.token)
                window.sessionStorage.setItem('type',response.data.type)
                window.sessionStorage.setItem('password',password)
                window.location.href = `${window.location.origin}`
                alert('登入成功')
            }
            else if(response.data.state === '500'){
                alert(response.data.error)
              }
          })
    }
    return (
        <div className='login' >
            <div>        
                <h1>會員登入</h1>
            </div>
            <div>

                <p>帳號: <input type='text' name='ID' placeholder='請輸入帳號' value={id} onChange={(e) => {setID(e.target.value)}}></input></p>
            </div>
            <div>
                <p>密碼:  <input type='password' name='Password' placeholder='請輸入密碼' value={password} onChange={(e) => {setPassword(e.target.value)}}></input></p>
            </div>
            <div>
            <button onClick={submit} className='button-ex1'>登入</button>
            <nav>
                <li><Link to="/member/register">註冊</Link></li>
            </nav>
            </div>
        </div>
)
    
    
}

export default Login