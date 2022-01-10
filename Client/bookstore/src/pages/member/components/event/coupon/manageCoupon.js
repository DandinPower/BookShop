import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Table, ButtonGroup, Button} from 'react-bootstrap'

const ManageCoupon = ({setCouponInfo}) =>{
    const [coupons,setCoupons] = useState([''])
   
    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/search',
            data:
            {
              type: window.sessionStorage.getItem('type'),
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            if(response.data.state !== 500){
                setCoupons(response.data)
            }
            else{
                alert(response.data.error)
              }
          })
    },[])
    
    const deleteCoupon =(code)=>{
      setCoupons(function (prev){
          return prev.filter(coupon => coupon.code !== code)
      })
      axios({
        method: 'POST',
        url: 'http://localhost:5000/event/coupon/delete',
        data:
        {
          type: window.sessionStorage.getItem('type'),
          userName: window.sessionStorage.getItem('userName'),
          token: window.sessionStorage.getItem('token'),
          code:code
        }
      }).then((response) => {
        if(response.data.state !== 500){
        }
        else{
            alert(response.data.error)
          }
      })
    }

    const OutPutDate=(date)=>{
      try{
        return(
        <div>
          <label>{date.substr(0,10)}</label>
        </div>
        )
      }
      catch(error){
        return(<label></label>)
      }
    }


    const ListCoupon = coupons.map((coupon)=>{
        return(<tr>
                <td>{coupon.code}</td>
                <td>{OutPutDate(coupon.date)}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.maxQuantity}</td>
                <td width="30%" className="text-start">{coupon.description}</td>
                <td>{coupon.name}</td>
                <td>
                  <ButtonGroup vertical>
                    <Link to='/member/event/updateCoupon'><Button variant="outline-success" onClick={e => setCouponInfo(coupon)}>更新優惠券</Button></Link>
                    <br/>
                    <Button variant="outline-danger" onClick={e => deleteCoupon(coupon.code)}>刪除優惠券</Button>
                  </ButtonGroup>
                </td>
               </tr>)
    })
    
    return(<Container>
           <Table hover className='text-center align-middle'>
            <thead className="fw-bold">
              <tr>
                <td>優惠碼</td>
                <td>優惠券到期日</td>
                <td>優惠折扣</td>
                <td>優惠券剩餘數量</td>
                <td>優惠券描述</td>
                <td>活動名稱</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              {ListCoupon}
            </tbody>
           </Table>
            
           </Container>)
}
export default ManageCoupon