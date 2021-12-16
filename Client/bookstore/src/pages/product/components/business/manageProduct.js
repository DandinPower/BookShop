import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const ManageProduct = ({setProductInfo}) =>{
    const [bookData, setBookData] = useState([""]);
    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/manage/search',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            setBookData(response.data)
          })
    },[])
  

    const listBooks = bookData.map((data)=>{
      if(data.image !== undefined){
        let status,launch = '';
        if(data.status === '1'){
          status = '有庫存';
        }
        else{
          status = '沒有庫存';
        }
        if(data.launch === '1'){
          launch = '上架';
        }
        else{
          launch = '下架';
        }
          return(
              <div>
                  <br/>
                  <Link to="/Products/business/updateproduct"><img src={`data:image/png;base64,${data.image}`}  alt={data.description} onClick={e => setProductInfo(data)}></img></Link>
                  <div>書名:{data.name}</div>
                  <div>簡述:{data.description}</div>
                  <div>價格:{data.price}</div>
                  <div>id:{data.productId}</div>
                  <div>分類:{data.category}</div>
                  <div>庫存:{status}</div>
                  <div>上下架:{launch}</div>
              </div>)
      }
      else{
         return(<div></div>)
      }
    })

  return(<div>
            <div>{listBooks}</div>
            <button><Link to="/Products/business/addproduct">新增商品</Link></button>
        </div>)
}
export default ManageProduct