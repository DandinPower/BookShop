import { useState } from 'react'
import axios from 'axios'

const UpdataOrder = ({orderInfo})=>{
    const [status,setStatus] = useState(orderInfo.status)

    const UpdateStatus = ()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/manage/order/status',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              orderNo: orderInfo.orderNo,
              status:status
            }
          }).then((response) => {
            if(response.data.state === 500){
                alert(response.data.error)
            }
            else{
                alert('修改成功')
            }
          })
    }

    return(
    <div>
        <div>訂單編號: {orderInfo.orderNo}</div>
        <div>
            <input type='radio' name="status" value='未出貨' onClick={(e) => {setStatus(e.target.value)}} checked={status === '未出貨'}></input>
            <label>未出貨</label>
            <input type='radio' name="status" value='出貨' onClick={(e) => {setStatus(e.target.value)}} checked={status === '出貨'}></input>
            <label>出貨</label>
            <input type='radio' name="status" value='訂單完成' onClick={(e) => {setStatus(e.target.value)}} checked={status === '訂單完成'}></input>
            <label>訂單完成</label>
            <br/>
            <button onClick={UpdateStatus}>修改狀態</button>
        </div>
    </div>)
}
export default UpdataOrder