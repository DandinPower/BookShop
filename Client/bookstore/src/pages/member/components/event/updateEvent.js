import React, {useState} from 'react'
import axios from 'axios'

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

    return(<div>
        <h1>修改活動</h1>
        <label>活動名稱: </label>
        <input type='text' value ={eventName} onChange={(e) => {setEventName(e.target.value)}} disabled></input>
        <br/>
        <label>活動到期日: </label>
        <input type='date' value ={eventDate.substr(0, 10)} onChange={(e) => {setEventDate(e.target.value)}}></input>
        <br/>
        <button onClick={UpDateEvent}>送出</button>
        </div>)
}
export default UpdateEvent