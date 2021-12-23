import axios from 'axios'
import React, {useState} from 'react'

const OrderComment = ({clientOrderInfo}) =>{
    const [star, setStar] = useState();
    const [comment, setComment] = useState();

    const SendComment = () =>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/order/comment',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              orderNo: clientOrderInfo.orderNo,
              star: parseInt(star),
              comment: comment,
            }
          }).then((response) => {
             if(response.data.state === 500){
                 alert(response.data.error)
             }
             else{
                alert('評論成功')
             }
            
        })
    }
    return(
    <div>
        <div>訂單編號:{clientOrderInfo.orderNo}的評價</div>
        <div>評價:
            <input type='radio' name="star" value='1' onClick={(e) => {setStar(e.target.value)}}></input>
            <label> 1 </label>
            <input type='radio' name="star" value='2' onClick={(e) => {setStar(e.target.value)}}></input>
            <label> 2 </label>
            <input type='radio' name="star" value='3' onClick={(e) => {setStar(e.target.value)}}></input>
            <label> 3 </label>
            <input type='radio' name="star" value='4' onClick={(e) => {setStar(e.target.value)}}></input>
            <label> 4 </label>
            <input type='radio' name="star" value='5' onClick={(e) => {setStar(e.target.value)}}></input>
            <label> 5 </label>
        </div>
        <div>
            <label>評論: </label>
            <input type='text'  value={comment} onChange={e=>setComment(e.target.value)}></input>
        </div>
        <div><button onClick={SendComment}>送出</button></div>
    </div>)
}
export default OrderComment