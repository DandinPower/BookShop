import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Container, Table, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 


const ViewCoupon =({eventName})=>{
    const [coupons,setCoupons] = useState([''])

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/customer/search',
            data:{
                name:eventName
            }
          }).then((response) => {
            if(response.data.state !== 500){
                setCoupons(response.data)
            }
            else{
                alert(response.data.error)
              }
          })
    },[eventName])

    const ReceiveCoupon =(code)=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/customer/receive',
            data:{
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
                code: code
            }
          }).then((response) => {
            if(response.data.state !== 500){
                alert('領取成功')
            }
            else{
                alert(response.data.error)
              }
          })
    }

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
        return(
          <tr>
            <td>{coupon.name}</td>
            <td>{coupon.code}</td>
            <td>{coupon.discount}</td>
            <td>{OutPutDate(coupon.date)}</td>
            <td>{coupon.maxQuantity}</td>
            <td>{coupon.description}</td>
            <td><Button variant='outline-primary' onClick={e=> ReceiveCoupon(coupon.code)} disabled={window.sessionStorage.getItem('type')!=='customer'}>領取優惠券</Button></td>
          </tr>
          
                )
    })

    return(<Container>
      <Table hover className='text-center align-middle'>
        <thead>
          <tr>
            <th>活動名稱</th>
            <th>活動優惠碼</th>
            <th>活動折扣</th>
            <th>活動到期日</th>
            <th>優惠券發行總數</th>
            <th>優惠券描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {ListCoupons}
        </tbody>
      </Table>

     </Container>)
}
export default ViewCoupon
/*<div>
        <div>活動名稱: {coupon.name}</div>
        <div>活動優惠碼: {coupon.code}</div>
        <div>活動折扣: {coupon.discount}</div>
        <div>活動到期日: {OutPutDate(coupon.date)}</div>
        <div>優惠券使用次數: {coupon.maxQuantity}</div>
        <div>優惠券描述: {coupon.description}</div>
        <button onClick={e=> ReceiveCoupon(coupon.code)} disabled={window.sessionStorage.getItem('type')!=='customer'}>領取優惠券</button>
        <br/>
</div>*/