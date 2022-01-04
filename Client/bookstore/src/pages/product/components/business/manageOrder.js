import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Col, Table, Button, ButtonGroup} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
                <tr>
                  <td>{data.orderNo}</td>
                  <td>{data.name}</td> 
                  <td>{data.orderDate}</td>
                  <td>{data.arrivalDate}</td>
                  <td>{data.quantity}</td>
                  <td>{data.status}</td> 
                  <td>{data.productId}</td> 
                  <td>{data.customerId}</td> 
                  <td>{data.price *parseInt(data.quantity) * parseFloat(data.discount)}</td> 
                  
                  <ButtonGroup vertical>
                    <Link to="/Products/business/updateorder">
                      <Button variant="outline-success" onClick={e => setOrderInfo(data)}>
                        Update
                      </Button>
                    </Link>
                      <br/>
                      <Button variant="outline-danger">Delete</Button>
                    </ButtonGroup>
                </tr>
           )
      })

    return(<Container >
            <Table bordered className="text-center align-middle">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>產品名稱</th>
                  <th>下訂日期</th>
                  <th>到達日期</th>
                  <th>數量</th>
                  <th>訂單狀態</th>
                  <th>產品編號</th>
                  <th>客戶編號</th>
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
export default ManageOrder
/* <div>
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
            </div>*/