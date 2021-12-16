import { useState } from 'react'
import axios from 'axios'
import "./css.css"

const Register = () => { 
    const [id,setID] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [gender,setGender] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [type,setType] = useState('customer')
    const send = () =>{
        console.log(id.length);
        if(phone.length !== 10){
            alert('電話號碼請等於10位數')
        }
        else if(id.length < 3){
            alert('帳號長度要大於3')
        }
        else if(password.length < 3){
            alert('密碼長度要大於3')
        }
        else{
            axios({
                method: 'POST',
                url: 'http://localhost:5000/account/register/',
                data:{
                  userName: id,
                  userPassword: password,
                  name: name,
                  gender: gender,
                  email: email,
                  phone: phone,
                  address: address,
                  type:type
                }
              }).then((response) => {
                if(response.data.state === '200'){
                    window.location.href = '/member/login'
                    alert('註冊成功')
                }
                else if(response.data.state === '500'){
                    alert(response.data.error)
                  }
              })
            }
       
    }
        
    return (
        <div className='register'>
            <h1>註冊帳號</h1>
            <table striped bordered hover>
                <colgroup>
                    <col width="30%"/>
                    <col width="70%"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th>
                            <label>會員帳號</label>
                        </th>
                        <td>
                            <input type='text' name="Id" value={id} onChange={(e) => {setID(e.target.value)}} ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>會員名稱</label>
                        </th>
                        <td>
                            <input type='text' name="Name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>電子郵件</label>
                        </th>
                        <td>
                            <input type='text' name="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>密碼</label>
                        </th>
                        <td>
                            <input type='password' name="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>性別</label>
                        </th>
                        <td>
                            <input type='radio' name="Gender" value='1' onClick={(e) => {setGender(e.target.value)}}></input>
                            <label>男</label>
                            <input type='radio' name="Gender" value='0' onClick={(e) => {setGender(e.target.value)}}></input>
                            <label>女</label>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>電話</label>
                        </th>
                        <td>
                            <input type='tel' name="Phone" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>地址</label>
                        </th>
                        <td>
                            <input type='text' name="Address" value={address} onChange={(e) => {setAddress(e.target.value)}}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>用戶類型</label>
                        </th>
                        <td>
                            <select aria-label="Default select example" onChange={(e) => {setType(e.target.value)}}>
                                <option value='customer'>customer</option>
                                <option value='business'>business</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button  onClick={send}  className='button-ex1'>確定送出</button>
        </div>
    )
}
export default Register