import axios from 'axios'
import React, {useState} from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

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

    <Container as={Form} className='text-center'>
        <br size="sm"/>
        <Form.Group as={Row}>
          <Form.Label column>活動名稱</Form.Label>
          <Col xs={10}>
              <Form.Control type='text' value ={clientOrderInfo.orderNo} disabled/>
          </Col> 
        </Form.Group>
        
        <br size="sm"/>
        <Form.Group as={Row}>
            <Form.Label column>評價</Form.Label>
            <Col xs={10} className="text-start">
                <Form.Check inline label="1" type="radio" name="star" value='1' onClick={(e) => {setStar(e.target.value)}}/> 
                <Form.Check inline label="2" type="radio" name="star" value='2' onClick={(e) => {setStar(e.target.value)}}/>
                <Form.Check inline label="3" type="radio" name="star" value='3' onClick={(e) => {setStar(e.target.value)}}/> 
                <Form.Check inline label="4" type="radio" name="star" value='4' onClick={(e) => {setStar(e.target.value)}}/> 
                <Form.Check inline label="5" type="radio" name="star" value='5' onClick={(e) => {setStar(e.target.value)}}/>     
            </Col> 
        </Form.Group>

        <br size="sm"/>
        <Form.Group as={Row}>
          <Form.Label column>評論</Form.Label>
          <Col xs={10}>
              <Form.Control as="textarea" type='text' value={comment} onChange={e=>setComment(e.target.value)} rows={3}/>
          </Col> 
        </Form.Group>

        <br size="sm"/>
        
        <div className='d-flex justify-content-center'>
            <Button size='lg' variant='success' onClick={SendComment}>送出</Button>
        </div>
    </Container>)
}
export default OrderComment