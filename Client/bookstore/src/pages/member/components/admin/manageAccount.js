import {useState} from 'react';
import axios from 'axios';
import {Container, Form, Col, Row, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const ManageAccount = ({accountInfo})=>{
    const [enable,setEnable] = useState(accountInfo.enable)

    const ChangeEnable = ()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/admin/account/update',
            data:{
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              id:accountInfo.id,
              enable:enable
            }
          }).then((response) => {
              if(response.data.state !== 500){
                  alert('更改成功')
              }
              else{
                  alert(response.data.error)
              }
               
          })
    }

    return(
      <div className='text-center'>
        <h1 className='fw-bold'> 帳戶權限修改 </h1>
          <Container className='border w-50'>
            <br size="lg"/>
            <Form>
              <Form.Group as={Row}>
                  <Form.Label column>ID</Form.Label>
                  <Col xs={10}>
                      <Form.Control type='text' readOnly defaultValue={accountInfo.id}/>
                  </Col> 
              </Form.Group>

              <br size="lg"/>
              <Form.Group as={Row}>
                  <Form.Label column>名字</Form.Label>
                  <Col xs={10}>
                      <Form.Control type='text' readOnly defaultValue={accountInfo.name}/>
                  </Col> 
              </Form.Group>

              <br size="lg"/>
              <Form.Group as={Row}>
                <Form.Label column>修改權限</Form.Label>
                <Col xs={10} className='text-start'>
                  <Form.Check inline label="正常使用" type='radio' value='1'  name='enable' checked={enable === '1'} onClick={e => setEnable('1')}/>
                  <Form.Check inline label="禁止使用" type='radio' value='0'  name='enable' checked={enable === '0'} onClick={e => setEnable('0')}/>
                </Col>
              </Form.Group>
            </Form>

            <div className='d-flex justify-content-center'>
              <Button variant='danger' onClick={ChangeEnable}>確認修改</Button>
            </div>
          </Container>
        </div>
        )
}
export default ManageAccount
