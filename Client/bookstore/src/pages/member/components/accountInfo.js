import { useState,useEffect } from 'react'
import axios from 'axios'
//未完成
const AccountInfo =()=>{
    const [userName,setuserName] = useState('')
    const [type,setType] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [gender,setGender] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [paymentInfo,setPaymentInfo] = useState('')
    const [logo,setLogo] = useState('')
    const [description,setDescription] = useState('')

    useEffect(()=>{
        if(window.sessionStorage.getItem('token')!== null){
            axios({
                method: 'POST',
                url: 'http://localhost:5000/account/search',
                data:{
                  userName: window.sessionStorage.getItem('userName'),
                  token: window.sessionStorage.getItem('token'),
                }
              }).then((response) => {
                  if(response.data.state === 200){
                    setuserName(response.data.userName)
                    setPassword(response.data.userPassword)
                    setName(response.data.name)
                    setGender(response.data.gender)
                    setEmail(response.data.email)
                    setPhone(response.data.phone)
                    setAddress(response.data.address)
                    setPaymentInfo(response.data.paymentInfo)
                    setDescription(response.data.description)
                    setLogo(response.data.logo)
                    setType(response.data.type)
                  }
                  else{
                      alert('error')
                  }
                   
              })
        }
    },[])

    const send=()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/account/update',
            data:
            {
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
                userPassword: password,
                name:name,
                gender:gender,
                email:email,
                phone:phone,
                address:address,
                paymentInfo:paymentInfo,
                description:description,
                logo:logo
            }
          }).then((response) => {
              if(response.data.state === 200){
                alert('更改成功')
              }
              else{
                  alert('error')
              }
               
          })
    }

    if (window.sessionStorage.getItem('token')!== null) {
        return(
            <table striped bordered hover>
            <colgroup>
                <col width="30%"/>
                <col width="70%"/>
            </colgroup>
            <tbody>
                <tr>
                    <th>
                        <label>會員帳號:</label>
                    </th>
                    <td>
                        <div>{userName}</div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>會員密碼:</label>
                    </th>
                    <td>
                    <input type='text' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>會員名稱:</label>
                    </th>
                    <td>
                    <input type='text' value={name} onChange={(e) => {setName(e.target.value)}}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>會員性別:</label>
                    </th>
                    <td>
                        <input type='radio' name="Gender" value='1' onClick={(e) => {setGender(e.target.value)}}  checked={gender === "1"}></input>
                        <label>男</label>
                        <input type='radio' name="Gender" value='0' onClick={(e) => {setGender(e.target.value)}} checked={gender === "0"}></input>
                        <label>女</label>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>E-mail:</label>
                    </th>
                    <td>
                    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>手機:</label>
                    </th>
                    <td>
                    <input type='text' value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>地址:</label>
                    </th>
                    <td>
                    <input type='text' value={address} onChange={(e) => {setAddress(e.target.value)}}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>paymentInfo:</label>
                    </th>
                    <td>
                    <input type='text' value={paymentInfo} onChange={(e) => {setPaymentInfo(e.target.value)}} disabled={type === 'business'}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>description:</label>
                    </th>
                    <td>
                    <input type='text' value={description} onChange={(e) => {setDescription(e.target.value)}} disabled={type === 'customer'}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>logo:</label>
                    </th>
                    <td>
                    <input type='text' value={logo} onChange={(e) => {setLogo(e.target.value)}} disabled={type === 'customer'}></input>
                    </td>
                </tr>
            </tbody>
            <button onClick={send}>更改資料</button>
        </table>
        
        )
    }
    else{
        return(<h1>尚未登入</h1>)
    }
}
export default AccountInfo