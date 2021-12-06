import { useState,useEffect } from 'react'
import axios from 'axios'
//未完成
const AccountInfo =()=>{
    const [userName,setuserName] = useState('')
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
                if(response.data.state === '200'){
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
                }
                else if(response.data.state === '500'){
                    alert(response.data.error)
                  }
              })
        }
    },[])

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
                        <label>會員帳號</label>
                    </th>
                    <td>
                        <input type='text' name="Id" value={userName} onChange={(e) => {setuserName(e.target.value)}} ></input>
                    </td>
                </tr>
            </tbody>
        </table>
        )
    }
    else{
        return(<h1>尚未登入</h1>)
    }
}
export default AccountInfo