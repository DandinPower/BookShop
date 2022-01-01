import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
      return(<div>
             <div>活動名稱: {event.name}</div>
             <div>活動到期日: {event.date}</div>
             <Link to = '/member/event/updateEvent'><button onClick={e => setEventInfo(event)}>修改活動</button></Link>
             <button onClick={e => deleteEvent(event.name)}>刪除活動</button>
             <Link to = ''><button>新增優惠券</button></Link>
             <br/>
             </div>)
  })

    return(<div>
           {ListEvent}
           <Link to = '/member/event/AddEvent'><button>新增活動</button></Link>
           </div>)
}
export default ManageEvent