import {Link} from 'react-router-dom'

const EventCenter = () =>{
    let userType = window.sessionStorage.getItem('type')
    let authority = window.sessionStorage.getItem('authority')
    const DecideView = (AccountUserType,AccountAuthority)=>{
        if(AccountUserType ==='customer'){
            return(<div>
                   <h1>顧客活動中心</h1>
                   <Link to='/member/event/viewEvent'>查看目前活動</Link>
                   <br/>
                   <Link to='/member/event/ViewMyCoupon'>查看我的優惠券</Link>
                   <br/>
                   </div>
        )}
        else if(AccountUserType ==='business' || AccountAuthority === 'all' || AccountAuthority === 'event'){
            console.log(1);
            return(<div>
                   <h1>管理活動中心</h1>
                   <Link to='/member/event/manageEvent'>查看目前活動</Link>
                   <br/>
                   <Link to='/member/event/manageCoupon'>查看目前優惠券</Link>
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