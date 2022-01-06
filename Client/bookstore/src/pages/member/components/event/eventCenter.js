import {Link} from 'react-router-dom'
import {Container, Row, Col, Table, Button, ButtonGroup} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const EventCenter = () =>{
    let userType = window.sessionStorage.getItem('type')
    let authority = window.sessionStorage.getItem('authority')
    const DecideView = (AccountUserType,AccountAuthority)=>{
        if(AccountUserType ==='customer'){
            return(
                <Row>
                  <h1 className="text-center fw-bold">顧客活動中心</h1>
                  <hr/>
                  <ButtonGroup vertical>
                    <Button variant='success' href='/member/event/viewEvent'>查看目前活動</Button>
                    <br/>
                    <Button variant='success' href='/member/event/ViewMyCoupon'>查看我的優惠卷</Button>
                    <br/>
                  </ButtonGroup>
                </Row>   
        )}
        else if(AccountUserType ==='business' || AccountAuthority === 'all' || AccountAuthority === 'event'){
            console.log(1);
            return(
            <Row>
              <h1 className="text-center fw-bold">管理活動中心</h1>
              <hr/>
              <ButtonGroup vertical>
                <Button variant='success' href='/member/event/manageEvent'>查看目前活動</Button>
                <br/>
                <Button variant='success' href='/member/event/manageCoupon'>查看目前優惠卷</Button>
                <br/>
              </ButtonGroup>
            </Row>  
        )}
        else{
            return(<h1>無法查看此頁</h1>)
        }
    }

    return(<Container className="w-50">
              {DecideView(userType,authority)}
           </Container>)
}
export default EventCenter