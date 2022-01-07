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

    const OutPutDate=(date)=>{
      try{
        return(
        <div>
          <label>{date.substr(0,10)}</label>
        </div>
        )
      }
      catch(error){
        return(<label></label>)
      }
    }
    
    const ListCoupons = coupons.map((coupon)=>{
        return(<tr>
                <td>{coupon.code}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.description}</td>
                <td>{OutPutDate(coupon.date)}</td>
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
                  <th>優惠券描述</th>
                  <th>活動到期日</th>
                  <th>優惠券使用次數</th>
                </tr>
              </thead>
              <tbody>
                {ListCoupons}
              </tbody>
            </Table>
            <p className='p-2 text-dark bg-opacity-10 text-end' >備註:商家發放的優惠券只能用在該商家</p>
           </Container>)
    
}
export default ViewMyCoupon