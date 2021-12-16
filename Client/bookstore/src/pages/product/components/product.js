import axios from 'axios'
import React, {useState,useEffect} from 'react'

const Product = ({bookInfo}) =>{
    const [comments, setComments] = useState(['']);
    function leave(){
        window.location.href = '/Products/category'
    }

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/comment',
            data:
            {
                productId:bookInfo.productId
            }
          }).then((response) => {
            setComments(response.data)
          })
    },[bookInfo])

    const addShopCart = () =>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/shopcar/add',
            data:{
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              productId:bookInfo.productId
            }
          }).then((response) => {
            if(response.data.state === 200){
                alert('加入成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }


    const postBook=()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/add',
            data:[{
                "userName": window.sessionStorage.getItem('userName'),
                "token": window.sessionStorage.getItem('token'),
                "productId":bookInfo.productId,
                "quantity":1
            }]
          }).then((response) => {
            if(response.data.state === 200){
                alert('下單成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }
    const listComments = comments.map((data)=>{
        return(
            <div>  
                <div>customerName:{data.name}</div>
                <div>star:{data.star}</div>
                <div>comment:{data.comment}</div>
            </div>) 
    })

    return(
        <div>
            <img src={`data:image/png;base64,${bookInfo.image}`}  alt={bookInfo.description}></img>
            <div>書名: {bookInfo.name}</div>
            <div>產品代號: {bookInfo.productId}</div>
            <div>商家名稱: {bookInfo.businessName}</div>
            <div>價格: {bookInfo.price}</div>
            <div>產品敘述: {bookInfo.description}</div>
            <button onClick={addShopCart}>加入購物車</button>
            <button onClick={postBook}>直接購買</button>
            <button onClick = {leave}>瀏覽其他商品</button>
            <div>{listComments}</div>
        </div>
    )
}
export default Product