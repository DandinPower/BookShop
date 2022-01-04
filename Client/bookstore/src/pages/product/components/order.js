import axios from 'axios'
import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Col, Table, Button, ButtonGroup} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Order =({setClientOrderInfo})=>{
    const [orderBooks, setOrderBooks] = useState(['']);
    
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

    let listOrder = ''

    if (orderBooks !== undefined) {
        listOrder = orderBooks.map((book)=>{
        return (
          <tr>
            <td>{book.orderNo}</td>
            <td>{book.name}</td> 
            <td>{book.orderDate}</td>
            <td>{book.arrivalDate}</td>
            <td>{book.quantity}</td>
            <td>{book.status}</td> 
            <td>{book.price * parseInt(book.quantity) * parseFloat(book.discount)}</td> 
            
            <ButtonGroup vertical>
                <Link to="/Products/ordercomment"  onClick={e =>setClientOrderInfo(book)} ><button disabled={book.status !=='訂單完成'}>評價此訂單</button></Link>
                <br/>
                <Button variant="outline-danger">撤銷此訂單</Button>
              </ButtonGroup>
          </tr>
        )
    })
    }
    else{
        return(<div>沒有訂單</div>)
    }

    return(
            <Container >
              <Table bordered className="text-center align-middle">
                <thead>
                    <tr>
                    <th>訂單編號</th>
                    <th>產品名稱</th>
                    <th>下訂日期</th>
                    <th>到達日期</th>
                    <th>數量</th>
                    <th>訂單狀態</th>
                    <th>總金額</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrder}
                </tbody>
              </Table>
            </Container>
         )

}
export default Order
                /*<div>
                    <br/>
                    <div>訂單編號:{book.orderNo}</div>
                    <div>名稱:{book.name}</div>
                    <div>數量:{book.quantity}</div>
                    <div>價格:{book.price * parseInt(book.quantity)}</div>
                    <div>配送狀態:{book.status}</div>
                    <div>下單日期:{book.orderDate}</div>
                    <div>到達日期:{book.arrivalDate}</div>
                    <Link to="/Products/ordercomment"><button disabled={book.status !=='訂單完成'} onClick={e =>setClientOrderInfo(book)}>評價此訂單</button></Link>
                </div> */