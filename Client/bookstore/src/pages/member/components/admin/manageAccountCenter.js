import {ButtonGroup, Button, Container, Row} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
const ManageAccountCenter =()=>{
    return(
        <Container className='w-50'>
            <Row className='text-center'>
                <h1 className='fw-bold'>帳號管理中心</h1>
                <hr/>
                <ButtonGroup vertical>
                    <Button variant='danger' href='/member/admin/manageBusiness'>查看所有廠商</Button>
                    <br/>
                    <Button variant='danger' href='/member/admin/manageCustomer'>查看所有顧客</Button>
                    <br/>
                </ButtonGroup>
            </Row>

        </Container>
        
        )
}
export default ManageAccountCenter