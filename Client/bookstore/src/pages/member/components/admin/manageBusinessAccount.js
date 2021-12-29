import { useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ManageBusinessAccount = ({setAccountInfo})=>{
    const [accountsInfo,setAccountsInfo] = useState([''])

    useEffect(()=>{
        if(window.sessionStorage.getItem('token')!== null){
            axios({
                method: 'POST',
                url: 'http://localhost:5000/admin/business/search',
                data:{
                  userName: window.sessionStorage.getItem('userName'),
                  token: window.sessionStorage.getItem('token'),
                }
              }).then((response) => {
                  if(response.data.state !== '500'){
                    setAccountsInfo(response.data)
                    console.log(response.data);
                  }
                  else{
                      alert(response.data.error)
                  }
                   
              })
        }
    },[])

    const listAccounts = accountsInfo.map((data)=>{
        return (
            <div>
              <div>businessId: {data.id}</div>
              <div>businessName: {data.name}</div>
              <div>phone: {data.phone}</div>
              <div>email: {data.email}</div>
              <div>address: {data.address}</div>
              <div>enable: {data.enable}</div>
              <div>
              <Link to='/member/admin/manageAccount'><button onClick={e => setAccountInfo(data)}>修改此帳號權限</button></Link>
              </div>
              <br/>
            </div>
        )
    })

    return(<div>{listAccounts}</div>)
}
export default ManageBusinessAccount