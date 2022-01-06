import { useState,useEffect } from 'react'
import axios from 'axios'
import {Table, Container, Button, Alert, Form} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
//未完成
const AccountInfo =()=>{
    const [userName,setuserName] = useState('')
    const [id,setId] = useState('')
    const [type,setType] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [gender,setGender] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [paymentInfo,setPaymentInfo] = useState('')
    const [logo,setLogo] = useState()
    const [description,setDescription] = useState('')
    const [imageFile, setImageFile] = useState();
    const [firstLogo, setFirstLogo] = useState(false);
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
                    setId(response.data.id)
                    setPassword(response.data.userPassword)
                    setName(response.data.name)
                    setGender(response.data.gender)
                    setEmail(response.data.email)
                    setPhone(response.data.phone)
                    setAddress(response.data.address)
                    setPaymentInfo(response.data.paymentInfo)
                    setDescription(response.data.description)
                    if(response.data.logo === ''){
                        setFirstLogo(true)
                    }
                    setLogo(`data:image/png;base64,${response.data.logo}`)
                    setType(response.data.type)
                  }
                  else{
                      alert('error')
                  }
                   
              })
        }
    },[])

    const handleOnPreview = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          setLogo(reader.result)
        }, false);
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    
    const UploadImg =()=>{
        const formData = new FormData();
        formData.append('image', imageFile);
        if(imageFile !== undefined && firstLogo){
            axios({
                method: 'POST',
                url: `http://localhost:5000/account/logo/add/${id}`,
                data:formData
            }).then((response) => {
                if(response.data.state === 200){
                    alert('圖片成功')
                }
                else{
                    alert(response.data.error)
                }
                
            })
        }
        else if(imageFile !== undefined){
            axios({
                method: 'POST',
                url: `http://localhost:5000/account/logo/update/${id}`,
                data:formData
            }).then((response) => {
                if(response.data.state === 200){
                    alert('圖片成功')
                }
                else{
                    alert(response.data.error)
                }
                
            })
        }
    }
    
    const send=()=>{
        
        if(phone.length !== 10){
            alert('電話號碼請等於10位數')
        }
        else if(userName.length < 3){
            alert('帳號長度要大於3')
        }
        else if(password.length < 3){
            alert('密碼長度要大於3')
        }
        else
        {
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
                    UploadImg()
                }
                else{
                    alert('error')
                }
                
            })
        }
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
                            <Form.Control as="textarea" type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} disabled={type === 'customer'} placehodler='請在此打上你的介紹'/>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-30 text-center">Logo</th>
                            <td>
                            <Form.Control type="file" accept="image/*" onChange={handleOnPreview} disabled={type === 'customer'}/>
                            <img src={logo} alt="" />
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