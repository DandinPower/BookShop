import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const ManageCoupon = ({setCouponInfo}) =>{
    const [coupons,setCoupons] = useState([''])
   
    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/search',
            data:
            {
              type: window.sessionStorage.getItem('type'),
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
    
    const deleteCoupon =(code)=>{
      setCoupons(function (prev){
          return prev.filter(coupon => coupon.code !== code)
      })
      axios({
        method: 'POST',
        url: 'http://localhost:5000/event/coupon/delete',
        data:
        {
          type: window.sessionStorage.getItem('type'),
          userName: window.sessionStorage.getItem('userName'),
          token: window.sessionStorage.getItem('token'),
          code:code
        }
      }).then((response) => {
        if(response.data.state !== 500){
        }
        else{
            alert(response.data.error)
          }
      })
    }

    const ListCoupon = coupons.map((coupon)=>{
        return(<div>
               <div>優惠碼: {coupon.code}</div>
               <div>優惠券到期日: {coupon.date}</div>
               <div>優惠折扣: {coupon.discount}</div>
               <div>優惠券使用次數: {coupon.maxQuantity}</div>
               <div>活動名稱: {coupon.name}</div>
               <Link to='/member/event/updateCoupon'><button onClick={e => setCouponInfo(coupon)}>更新優惠</button></Link>
               <button onClick={e => deleteCoupon(coupon.code)}>刪除優惠券</button>
               <br/>
               </div>)
    })
    
    return(<div>
           {ListCoupon}
           </div>)
}
export default ManageCoupon