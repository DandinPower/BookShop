import {Link} from 'react-router-dom'

const ManageAccountCenter =()=>{
    return(<div>
           <Link to='/member/admin/manageBusiness'>查看所有廠商</Link>
           <br/>
           <Link to='/member/admin/manageCustomer'>查看所有顧客</Link>
           </div>)
}
export default ManageAccountCenter