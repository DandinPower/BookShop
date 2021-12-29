import {useState} from 'react';
import axios from 'axios';

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

    return(<div>
           <div>id: {accountInfo.id}</div>
           <div>name: {accountInfo.name}</div>
           <label>修改權限: </label>
           <input type='radio' value='1'  name='enable' checked={enable === '1'} onClick={e => setEnable('1')}></input>
           <label >正常使用</label>
           <input type='radio' value='0'  name='enable' checked={enable === '0'} onClick={e => setEnable('0')}></input>
           <label >禁止使用</label><br/>
           <button onClick={ChangeEnable}>確認修改</button>
           </div>)
}
export default ManageAccount