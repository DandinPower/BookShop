import {Link} from 'react-router-dom'

const EventCenter = () =>{
    let userType = window.sessionStorage.getItem('type')
    let authority = window.sessionStorage.getItem('authority')
    console.log(userType,authority);
    const DecideView = (AccountUserType,AccountAuthority)=>{
        if(AccountUserType ==='customer'){
            return(<div>
                   <div>我是顧客</div>
                   <Link to=''>查看目前活動</Link>
                   </div>
        )}
        else if(AccountUserType ==='business' || AccountAuthority === 'all' || AccountAuthority === 'event'){
            console.log(1);
            return(<div>
                   <div>我是商家或是管理員</div>
                   <Link to=''>查看目前活動</Link>
                   </div>
        )}
        else{
            return(<h1>無法查看此頁</h1>)
        }
    }

    return(<div>
           {DecideView(userType,authority)}
           </div>)
}
export default EventCenter