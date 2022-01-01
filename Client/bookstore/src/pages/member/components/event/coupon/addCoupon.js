import React, {useState} from 'react'
import axios from 'axios'

const AddCoupon = ({eventInfo}) =>{
    const [code,setCode] = useState('')
    const [date,setDate] = useState('')
    const [discount,setDiscount] = useState()
    const [maxQuantity,setMaxQuantity] = useState()

    const SendCoupon = ()=>{
        if(date !=='' && code !=='' && code.length <= 10 &&  discount > 0 && maxQuantity > 0 && discount < 1){
            axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/add',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              name:eventInfo.name,
              code:code,
              date:date,
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
           <h1>新增優惠券</h1>
           <label>活動名稱: </label>
           <input type='text' value={eventInfo.name} disabled></input>
           <br/>
           <label>優惠碼: </label>
           <input type='text' onChange={e => setCode(e.target.value)}></input>
           <br/>
           <label>優惠券到期日: </label>
           <input type='date' onChange={e => setDate(e.target.value)}></input>
           <br/>
           <label>優惠券折扣: </label>
           <input type='number'onChange={e => setDiscount(e.target.value)}></input>
           <br/>
           <label>優惠券最多使用次數: </label>
           <input type='number'onChange={e => setMaxQuantity(e.target.value)}></input>
           <br/>
           <button onClick={SendCoupon}>送出</button>
           </div>)
}
export default AddCoupon