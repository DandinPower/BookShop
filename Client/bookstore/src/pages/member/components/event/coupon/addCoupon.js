import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddCoupon = ({eventInfo}) =>{
    const [code,setCode] = useState('')
    const [date,setDate] = useState('')
    const [discount,setDiscount] = useState()
    const [maxQuantity,setMaxQuantity] = useState()
    const [description,setDescription] = useState()

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
              maxQuantity:maxQuantity,
              description:description
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

    return(
      <Container className='w-50 text-center'>
        <h1>新增優惠券</h1>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column>活動名稱</Form.Label>
            <Col xs={10}>
              <Form.Control type='text' value={eventInfo.name} disabled/>
            </Col>
          </Form.Group>
          <br size="sm"/>
          <Form.Group as={Row}>
              <Form.Label column>優惠碼</Form.Label>
              <Col xs={10}>
                  <Form.Control type='text' onChange={e => setCode(e.target.value)}/>
              </Col> 
          </Form.Group>
          
          <br size="sm"/>
          <Form.Group as={Row}>
              <Form.Label column>優惠券到期日</Form.Label>
              <Col xs={10}>
                  <Form.Control type='date' onChange={e => setDate(e.target.value)}/>
              </Col> 
          </Form.Group>
          
          <br size="sm"/>
          <Form.Group as={Row}>
              <Form.Label column>優惠券折扣</Form.Label>
              <Col xs={10}>
                  <Form.Control type='number'onChange={e => setDiscount(e.target.value)}/>
              </Col> 
          </Form.Group>

          <br size="sm"/>
          <Form.Group as={Row}>
              <Form.Label column>優惠券發行總數</Form.Label>
              <Col xs={10}>
                  <Form.Control type='number'onChange={e => setMaxQuantity(e.target.value)}/>
              </Col> 
          </Form.Group>

          <br size="sm"/>
          <Form.Group as={Row}>
              <Form.Label column>優惠券描述</Form.Label>
              <Col xs={10}>
                  <Form.Control as="textarea" type='text'onChange={e => setDescription(e.target.value)}/>
              </Col> 
          </Form.Group>
        </Form>

        

        <br size='lg'/>
        <div className='d-flex justify-content-center'>
          <Button size='lg' variant='success' onClick={SendCoupon}>送出</Button>
        </div>
      </Container>
          )
}
export default AddCoupon