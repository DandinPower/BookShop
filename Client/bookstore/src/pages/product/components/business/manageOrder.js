import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const ManageOrder = ({setOrderInfo})=>{

    const [orderData, setOrderData] = useState([""]);
    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/manage/order/search',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            setOrderData(response.data)
          })
    },[])

    const listOrder = orderData.map((data)=>{
        return(
            <div>
                <br/>
                <div>訂單編號: {data.orderNo}</div>
                <div>下訂日期: {data.orderDate}</div>
                <div>到達日期: {data.arrivalDate}</div>
                <div>數量: {data.quantity}</div>
                <div>訂單狀態: {data.status}</div>
                <div>產品編號: {data.productId}</div>
                <div>客戶編號: {data.customerId}</div>
                <div>產品名稱: {data.orderNo}</div>
                <div>價格: {data.price}</div>
                <Link to="/Products/business/updateorder"><button onClick={e =>setOrderInfo(data)}>修改此訂單</button></Link>
            </div>)
      })

    return(<div>{listOrder}</div>)
}
export default ManageOrder