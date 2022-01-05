import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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

    const ListCoupons = coupons.map((coupon)=>{
        return(<div>
               <div>活動名稱: {coupon.name}</div>
               <div>活動優惠碼: {coupon.code}</div>
               <div>活動折扣: {coupon.discount}</div>
               <div>活動到期日: {coupon.date}</div>
               <div>優惠券使用次數: {coupon.maxQuantity}</div>
               <button onClick={e=> ReceiveCoupon(coupon.code)}>領取優惠券</button>
               <br/>
               </div>)
    })

    return(<div>{ListCoupons}</div>)
}
export default ViewCoupon