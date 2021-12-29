import { useState } from 'react'
import axios from 'axios'
import "./css.css"
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminLogin = ()=>{
    const [id,setID] = useState('')
    const [password,setPassword] = useState('')
    const submit = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/admin/login',
            data:{
              userName: id,
              userPassword: password,
            }
          }).then((response) => {
            if(response.data.state !== '500'){
                window.sessionStorage.setItem('userName',id)
                window.sessionStorage.setItem('token',response.data.token)
                window.sessionStorage.setItem('authority',response.data.authority)
                window.location.href = `${window.location.origin}`
                alert('登入成功')
            }
            else{
                alert(response.data.error)
              }
          })
    }
    return (
        <div className='login' >
            <div>        
                <h1>管理員登入</h1>
            </div>
            <div>

                <p>帳號: <input type='text' name='ID' placeholder='請輸入帳號' value={id} onChange={(e) => {setID(e.target.value)}}></input></p>
            </div>
            <div>
                <p>密碼:  <input type='password' name='Password' placeholder='請輸入密碼' value={password} onChange={(e) => {setPassword(e.target.value)}}></input></p>
            </div>
            <div>
            <button onClick={submit} className='button-ex1'>登入</button>
            </div>
        </div>
)
}
export default AdminLogin