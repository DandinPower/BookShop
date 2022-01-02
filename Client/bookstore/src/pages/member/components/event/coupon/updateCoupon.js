import React, {useState} from 'react'
import axios from 'axios'

const UpdateCoupon =({couponInfo})=>{
    const [date,setDate] = useState(couponInfo.date)
    const [discount,setDiscount] = useState(couponInfo.discount)
    const [maxQuantity,setMaxQuantity] = useState(couponInfo.maxQuantity)

    const UpdateCoupon = ()=>{
        if(date !==''  &&  discount > 0 && maxQuantity > 0 && discount < 1){
            axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/update',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              code:couponInfo.code,
              date:date.substr(0, 10),
              discount:discount,
              maxQuantity:maxQuantity
            }
          }).then((response) => {
            if(response.data.state !== 500){
                alert('成功')
                window.location.href = '/member/event/manageCoupon'
            }
            else{
                alert(response.data.error)
              }
          })
        }
        else{
            alert('請勿空白，優惠碼不能大於10位，0 < 折扣 < 1,次數 > 0')
        }
    }

    return(<div>
        <h1>更新優惠券</h1>
        <label>優惠碼: </label>
        <input type='text' value={couponInfo.code} disabled></input>
        <br/>
        <label>優惠券到期日: </label>
        <input type='date' value={date.substr(0, 10)} onChange={e => setDate(e.target.value)}></input>
        <br/>
        <label>優惠券折扣: </label>
        <input type='number' value={discount} onChange={e => setDiscount(e.target.value)}></input>
        <br/>
        <label>優惠券最多使用次數: </label>
        <input type='number' value={maxQuantity} onChange={e => setMaxQuantity(e.target.value)}></input>
        <br/>
        <button onClick={UpdateCoupon}>更新</button>
        </div>)
}
export default UpdateCoupon