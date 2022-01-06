import React, {useState} from 'react'
import axios from 'axios'
import {Container, Form, Row, Col, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const UpdateEvent =({eventInfo})=>{
    const [eventName,setEventName] = useState(eventInfo.name)
    const [eventDate,setEventDate] = useState(eventInfo.date)

    const UpDateEvent = ()=>{
        if(eventName !=='' && eventDate !==''){
            axios({
            method: 'POST',
            url: 'http://localhost:5000/event/update',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              name:eventName,
              date:eventDate.substr(0, 10)
            }
          }).then((response) => {
            if(response.data.state !== 500){
                window.location.href = '/member/event/manageEvent'
                alert('修改成功')
            }
            else{
                alert(response.data.error)
              }
          })
        }
        else{
            alert('活動名和名稱不能空白')
        }
    }
 
    return(<Container as={Form} className='text-center'>
            <h1>修改活動</h1>
            <Form.Group as={Row}>
              <Form.Label column>活動名稱</Form.Label>
              <Col xs={10}>
                  <Form.Control type='text' value ={eventName} onChange={(e) => {setEventName(e.target.value)}} disabled/>
              </Col> 
            </Form.Group>

            <br size="sm"/>
            <Form.Group as={Row}>
              <Form.Label column>活動到期日</Form.Label>
              <Col xs={10}>
                  <Form.Control type='date' value ={eventDate.substr(0, 10)} onChange={(e) => {setEventDate(e.target.value)}}/>
              </Col> 
            </Form.Group>
            <br/>

            <div className='d-flex justify-content-center'>
              <Button variant='success' onClick={UpDateEvent}>送出</Button>
            </div>
            
          </Container>)
}
export default UpdateEvent