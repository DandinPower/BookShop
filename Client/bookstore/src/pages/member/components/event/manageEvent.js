import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {ButtonGroup, Container, Table, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const ManageEvent = ({setEventInfo})=>{
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

    const ListEvent = events.map((event)=>{
      return(<tr>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>
                <ButtonGroup vertical>
                  <Link to = '/member/event/updateEvent'><button className='me-2' onClick={e => setEventInfo(event)}>修改活動</button></Link>
                  <br/>
                  <button onClick={e => deleteEvent(event.name)}>刪除活動</button>
                  <br/>
                  <Link to = '/member/event/addCoupon'><button onClick={e => setEventInfo(event)}>新增優惠券</button></Link>
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