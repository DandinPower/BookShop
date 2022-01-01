import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
     
    const ListEvent = events.map((event)=>{
        return(<div>
               <div>舉辦人ID: {event.organizerId}</div>
               <div>舉辦商家: {event.organizerName}</div>
               <div>活動名稱: {event.name}</div>
               <div>活動到期日: {event.date}</div>
               <Link to='/member/event/ViewCoupon'><button onClick={e => setEventName(event.name)}>查看此活動優惠券</button></Link>
               <br/>
               </div>)
    })

    return(<div>{ListEvent}</div>)
   
}
export default ViewEvent