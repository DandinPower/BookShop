import React, {useEffect,useState} from 'react'
import axios from 'axios'

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
        return(<div>
               <div>活動優惠碼: {coupon.code}</div>
               <div>活動折扣: {coupon.discount}</div>
               <div>活動到期日: {coupon.date}</div>
               <div>優惠券使用次數: {coupon.quantity}</div>
               <br/>
               </div>)
    })


    return(<div>
           <h1>我的優惠券</h1>
           {ListCoupons}
           </div>)
    
}
export default ViewMyCoupon