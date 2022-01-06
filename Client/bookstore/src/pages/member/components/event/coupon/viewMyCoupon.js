import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Container, Table} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const ViewMyCoupon =()=>{
    const [coupons,setCoupons] = useState([''])

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/customer/have',
            data:{
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            if(response.data.state !== 500){
                setCoupons(response.data)
            }
            else{
                alert(response.data.error)
              }
          })
    },[])
    
    const ListCoupons = coupons.map((coupon)=>{
        return(<tr>
                <td>{coupon.code}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.date}</td>
                <td>{coupon.quantity}</td>
               </tr>)
    })


    return(<Container className='text-center' >
            <h1 className='fw-bold bg-dark p-2 text-dark bg-opacity-10' >我的優惠券</h1>
            <hr/>
            <Table>
              <thead>
                <tr>
                  <th>活動優惠碼</th>
                  <th>活動折扣</th>
                  <th>活動到期日</th>
                  <th>優惠券使用次數</th>
                </tr>
              </thead>
              <tbody>
                {ListCoupons}
              </tbody>
            </Table>
              
           </Container>)
    
}
export default ViewMyCoupon