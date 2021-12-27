import { useState,useEffect } from 'react'
import axios from 'axios'
import {Table, Container, Button, Alert, Form} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
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
            <Container>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th className="w-30 text-center">會員帳號</th>
                            <td>
                            <Form.Control plaintext readOnly defaultValue={userName}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">會員密碼</th>
                            <td>
                            <Form.Control type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">會員名稱</th>
                            <td>
                            <Form.Control type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">會員性別</th>
                            <td>
                            <Form.Check inline label="男" type="radio" name="Gender" value='1' onClick={(e) => {setGender(e.target.value)}}  checked={gender === "1"}/>
                            <Form.Check inline label="女" type="radio" name="Gender" value='0' onClick={(e) => {setGender(e.target.value)}}  checked={gender === "0"}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">E-mail</th>
                            <td>
                            <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='example@gmail.com'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">手機</th>
                            <td>
                            <Form.Control type="number" value={phone} onChange={(e) => {setPhone(e.target.value)}} placeholder='ex:091234567'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">地址</th>
                            <td>
                            <Form.Control type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} placehodler='xx市oo區..'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">Payment information</th>
                            <td>
                            <Form.Control type="text" value={paymentInfo} onChange={(e) => {setPaymentInfo(e.target.value)}} disabled={type === 'business'} placehodler='現金'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">Description</th>
                            <td>
                            <Form.Control type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} disabled={type === 'customer'} placehodler='請在此打上你的介紹'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">Logo</th>
                            <td>
                            <Form.Control type="text" value={logo} onChange={(e) => {setLogo(e.target.value)}} disabled={type === 'customer'}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={send}>
                        更改資料
                    </Button>
                </div>
            </Container>         
        )
    }
    else{
        return(<Alert variant="danger">
        <Alert.Heading>個人資料查詢失敗</Alert.Heading>
        <hr/>
        <p>
          請先檢查是否有登入成功，確認登入後再重新提交查詢個人資料請求
        </p>
      </Alert>)
    }
}
export default AccountInfo
/*
<input type='radio' name="Gender" value='1' onClick={(e) => {setGender(e.target.value)}}  checked={gender === "1"}></input>
                                <label>男</label>
                                <input type='radio' name="Gender" value='0' onClick={(e) => {setGender(e.target.value)}} checked={gender === "0"}></input>
                                <label>女</label>*/