import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {ButtonGroup, Container, Table, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const ManageEvent = ({setEventInfo,setEventName})=>{
    const [events,setEvents] = useState([''])

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/search',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            if(response.data.state !== 500){
                setEvents(response.data)
                console.log(response.data);
            }
            else{
                alert(response.data.error)
              }
          })
    },[])

    const deleteEvent =(name)=>{
      setEvents(function (prev){
          return prev.filter(event => event.name !== name)
      })
      axios({
        method: 'POST',
        url: 'http://localhost:5000/event/delete',
        data:
        {
          type: window.sessionStorage.getItem('type'),
          userName: window.sessionStorage.getItem('userName'),
          token: window.sessionStorage.getItem('token'),
          name:name
        }
      }).then((response) => {
        if(response.data.state !== 500){
        }
        else{
            alert(response.data.error)
          }
      })
    }

    const OutPutDate=(date)=>{
      try{
        return(
        <div>
          <label>{date.substr(0,10)}</label>
        </div>
        )
      }
      catch(error){
        return(<label></label>)
      }
    }

    const ListEvent = events.map((event)=>{
      return(<tr>
              <td>{event.name}</td>
              <td>{OutPutDate(event.date)}</td>
              <td>
                <ButtonGroup vertical>
                  <Link to = '/member/event/updateEvent'><Button variant="outline-success" className='me-2' onClick={e => setEventInfo(event)}>修改活動</Button></Link>
                  <br/>
                  <Link to = '/member/event/addCoupon'><Button variant="outline-success" onClick={e => setEventInfo(event)}>新增優惠券</Button></Link>
                  <br/>
                  <Link to = '/member/event/manageEvent'><Button variant="outline-danger" onClick={e => deleteEvent(event.name)}>刪除活動</Button></Link>                 
                  <br/>
                  <Link to='/member/event/ViewCoupon'><Button variant="outline-dark" onClick={e => setEventName(event.name)}>查看此活動優惠券</Button></Link>
                </ButtonGroup>
              </td>
             </tr>)
  })

    return(<Container >
            <Table hover className='text-center align-middle'>
              <thead>
                <tr>
                  <th>活動名稱</th>
                  <th>活動到期日</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {ListEvent}
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <Button variant='success' size='lg' href='/member/event/AddEvent'>新增活動</Button>
            </div>
           </Container>)
}
export default ManageEvent