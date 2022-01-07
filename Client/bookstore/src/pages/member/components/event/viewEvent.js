import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Table} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

const ViewEvent=({setEventName})=>{
    const [events,setEvents] = useState([''])

    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost:5000/event/all'
          }).then((response) => {
            if(response.data.state !== 500){
                setEvents(response.data)
            }
            else{
                alert(response.data.error)
              }
          })
    },[])

    const OutPutDate=(date)=>{
      try{
        return(
        <div>
          <label>日期:{date.substr(0,10)}</label>
        </div>
        )
      }
      catch(error){
        return(<label></label>)
      }
    }
     
    const ListEvent = events.map((event)=>{
        return(<tr>
                <td>{event.organizerName}</td>
                <td>{event.name}</td>
                <td>{OutPutDate(event.date)}</td>
                <td><Link to='/member/event/ViewCoupon'><button onClick={e => setEventName(event.name)}>查看此活動優惠券</button></Link></td>
               </tr>)
    })

    return(
          <Container as={Table} hover className="text-center fw-bold">
            <thead>
              <tr>
                <td>舉辦商家</td>
                <td>活動名稱</td>
                <td>活動到期日</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              {ListEvent}
            </tbody>
          </Container>
        )
   
}
export default ViewEvent