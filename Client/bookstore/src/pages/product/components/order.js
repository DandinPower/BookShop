import axios from 'axios'
import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

const Order =({setClientOrderInfo})=>{
    const [orderBooks, setOrderBooks] = useState();

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/search',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            setOrderBooks(response.data)
          })
    },[])

    if (orderBooks!== undefined) {
        return orderBooks.map((book)=>{
            return (
                <div>
                    <br/>
                    <div>訂單編號:{book.orderNo}</div>
                    <div>名稱:{book.name}</div>
                    <div>數量:{book.quantity}</div>
                    <div>價格:{book.price * parseInt(book.quantity)}</div>
                    <div>配送狀態:{book.status}</div>
                    <div>下單日期:{book.orderDate}</div>
                    <div>到達日期:{book.arrivalDate}</div>
                    <Link to="/Products/ordercomment"><button disabled={book.status !=='訂單完成'} onClick={e =>setClientOrderInfo(book)}>評價此訂單</button></Link>
                </div>
                
            )
        })
    }
    else{
        return(<div>沒有訂單</div>)
    }

}
export default Order
