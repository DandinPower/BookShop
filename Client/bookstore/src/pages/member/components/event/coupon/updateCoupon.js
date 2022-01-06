import React, {useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Container, Form, Row, Col, Button} from 'react-bootstrap'

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

    return(<Container className='w-50 text-center'>
            <h1>更新優惠券</h1>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column>優惠碼</Form.Label>
                <Col xs={10}>
                <Form.Control type='text' value={couponInfo.code} disabled/>
                </Col>
              </Form.Group>
              <br size="sm"/>
              <Form.Group as={Row}>
                  <Form.Label column>優惠券到期日</Form.Label>
                  <Col xs={10}>
                      <Form.Control type='date' value={date.substr(0, 10)} onChange={e => setDate(e.target.value)}/>
                  </Col> 
              </Form.Group>
              
              <br size="sm"/>
              <Form.Group as={Row}>
                  <Form.Label column>優惠券折扣</Form.Label>
                  <Col xs={10}>
                      <Form.Control type='number' value={discount} onChange={e => setDiscount(e.target.value)}/>
                  </Col> 
              </Form.Group>
              
              <br size="sm"/>
              <Form.Group as={Row}>
                  <Form.Label column>優惠券發送總數量</Form.Label>
                  <Col xs={10}>
                      <Form.Control type='number' value={maxQuantity} onChange={e => setMaxQuantity(e.target.value)}/>
                  </Col> 
              </Form.Group>
            </Form>

            <br size='lg'/>
            <div className='d-flex justify-content-center'>
              <Button size='lg' variant='success' onClick={UpdateCoupon}>更新</Button>
            </div>
          </Container>)
}
export default UpdateCoupon