import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Manage = () =>{
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
          return(
              <div>
                  <img src={`data:image/png;base64,${data.image}`}  alt={data.description}></img>
                  <div>書名:{data.name}</div>
                  <div>簡述:{data.description}</div>
                  <div>價格:{data.price}</div>
                  <div>id:{data.productId}</div>
                  <div></div>
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
export default Manage