import React, {useState} from 'react'
import axios from 'axios'

const AddEvent = ()=>{
    const [eventName,setEventName] = useState('')
    const [eventDate,setEventDate] = useState('')

    const SendEvent = ()=>{
        if(eventName !=='' && eventDate !==''){
            axios({
            method: 'POST',
            url: 'http://localhost:5000/event/add',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              name:eventName,
              date:eventDate
            }
          }).then((response) => {
            if(response.data.state !== 500){
                window.location.href = '/member/event/manageEvent'
                alert('建立成功')
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
           <h1>新增活動</h1>
           <label>活動名稱: </label>
           <input type='text' onChange={(e) => {setEventName(e.target.value)}}></input>
           <br/>
           <label>活動到期日: </label>
           <input type='date' onChange={(e) => {setEventDate(e.target.value)}}></input>
           <br/>
           <button onClick={SendEvent}>送出</button>
           </div>)
}
export default AddEvent