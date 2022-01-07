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
     
   const PostWithdrawRes=(answer,orderNo)=>{
      axios({
        method: 'POST',
        url: 'http://localhost:5000/product/order/cancel/confirm',
        data:
        {
          userName: window.sessionStorage.getItem('userName'),
          token: window.sessionStorage.getItem('token'),
          orderNo:orderNo,
          answer:answer
        }
      }).then((response) => {
        if(response.data.state !== 500){
          alert('已處理訂單撤銷')
        }
        else{
          alert(response.data.error)
        }
      })
   }

   const ReturnOrder=(orderNo)=>{
    axios({
      method: 'POST',
      url: 'http://localhost:5000/product/manage/order/delete',
      data:
      {
        userName: window.sessionStorage.getItem('userName'),
        token: window.sessionStorage.getItem('token'),
        orderNo:orderNo,
      }
    }).then((response) => {
      if(response.data.state !== 500){
        alert('訂單已撤銷')
      }
      else{
        alert(response.data.error)
      }
    })
   }

   const ButtonView =(data)=>{
     if(data.status !=='申請取消' && data.status !=='取消成功' && data.status !=='賣家撤銷此訂單'){
       return(
        <ButtonGroup vertical>
              <Link to="/Products/business/updateorder">
                <Button variant="outline-success" onClick={ e => setOrderInfo(data)}>更新訂單</Button>
              </Link>
              <br />
              <Button variant="outline-danger" onClick={e=>ReturnOrder(data.orderNo)} disabled={data.status !=='未出貨'}>撤銷訂單</Button>
        </ButtonGroup>
             )
      }
      else if(data.status ==='取消成功' || data.status ==='賣家撤銷此訂單'){
        return(<div></div>)
      }
      else{
        return(
          <ButtonGroup vertical>
             <Button variant="outline-success" onClick={e =>PostWithdrawRes('Yes',data.orderNo)}>接受撤回</Button>
             <br/>
             <Button variant="outline-danger" onClick={e =>PostWithdrawRes('No',data.orderNo)}>拒絕撤回</Button>
          </ButtonGroup>
        )
      }
   }

    const listOrder = orderData.map((data)=>{
        return(
                <tr>
                  <td>{data.orderNo}</td>
                  <td>{data.name}</td> 
                  <td>{data.orderDate}</td>
                  <td>{data.arrivalDate}</td>
                  <td>{data.address}</td>
                  <td>{data.paymentInfo}</td>
                  <td>{data.quantity}</td>
                  <td>{data.status}</td> 
                  <td>{data.productId}</td> 
                  <td>{data.customerId}</td> 
                  <td>{Math.round(data.price *parseInt(data.quantity) * parseFloat(data.discount))}</td> 
                  <td>{ButtonView(data)}</td>
                </tr>
           )
      })

    return(<Container >
            <Table bordered hover className="text-center align-middle">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>產品名稱</th>
                  <th>下訂日期</th>
                  <th>到達日期</th>
                  <th>配送地址</th>
                  <th>付款方式</th>
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
            </div>
                              <ButtonGroup vertical>
                    <Link to="/Products/business/updateorder">
                      <Button variant="outline-success" onClick={ e => setOrderInfo(data)}>
                        Update
                      </Button>
                    </Link>
                      <br/>
                      <Button variant="outline-danger">接受撤回</Button>
                    </ButtonGroup>
            
            
            
            */