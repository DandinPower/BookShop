import { useState } from 'react'
import axios from 'axios'
import {Container, Form, Col, Row, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

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
        <Container>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">訂單編號</Form.Label>
                <Col xs={10}>
                    <Form.Control type='text' readOnly defaultValue={orderInfo.orderNo}/>
                </Col> 
            </Form.Group>

            <br size="lg"/>
            <Form.Group as={Row}>
              <Form.Label column className="text-center">是否有庫存</Form.Label>
              <Col xs={10}>
                <Form.Check inline label="未出貨" type="radio" name="status" value='未出貨' onClick={(e) => {setStatus(e.target.value)}} checked={status === '未出貨'}/>
                <Form.Check inline label="出貨" type="radio" name="status" value='出貨' onClick={(e) => {setStatus(e.target.value)}} checked={status === '出貨'}/>
                <Form.Check inline label="訂單完成" type="radio" name="status" value='訂單完成' onClick={(e) => {setStatus(e.target.value)}} checked={status === '訂單完成'}/>
              </Col>
            </Form.Group>
          </Form>

          <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={UpdateStatus}>修改訂單狀態</Button>
          </div>
        </Container>
    )
}
export default UpdataOrder
    /*<div>
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
    </div> */