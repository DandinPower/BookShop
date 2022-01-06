import { useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Container, Table} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td>{data.enable}</td>
              <td>
                <Link to='/member/admin/manageAccount'><button onClick={e => setAccountInfo(data)}>修改此帳號權限</button></Link>
              </td>
              <br/>
            </tr>
        )
    })

    return(
      <Container>
      <Table hover className='text-center align-middle'>
        <thead>
          <tr>
            <th>廠商ID</th>
            <th>廠商名稱</th>
            <th>電話</th>
            <th>e-mail</th>
            <th>地址</th>
            <th>權限許可</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {listAccounts}
        </tbody>
      </Table>

     </Container>)
}
export default ManageBusinessAccount