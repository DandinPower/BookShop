import React, { useEffect,useState} from 'react'
import axios from 'axios'

const ShopCart = () => {
    const [books, setBooks] = useState(['']);
    const [price, setPrice] = useState();
    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/shopcar/all',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            if(response.data.state !== '500'){
                setBooks(response.data)
            }
            else{
                alert(response.data.error)
              }
          })
    },[])
    
    useEffect(()=>{
        let sum = 0;
        books.forEach(function(book){
            sum += book.price * parseInt(book.quantity)  ;
        })
        setPrice(sum)
    },[books])

    function changeQuantity(BID,newQ){
        setBooks(function (prev){
            return prev.map((book)=>{
                if(book.productId === BID){
                    book.quantity = newQ
                }
                return(book)
            })
        })
        axios({
            method: 'POST',
            url: 'http://localhost:5000/shopcar/update',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              productId:BID,
              quantity:newQ
            }
          }).then((response) => {
            if(response.data.state === 200){
                alert('更改成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    function deleteBook (BID){
        setBooks(function (prev){
            return prev.filter(book => book.productId !== BID)
        })
        axios({
            method: 'POST',
            url: 'http://localhost:5000/shopcar/delete',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              productId:BID
            }
          }).then((response) => {
            if(response.data.state === 200){
                alert('刪除成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const listBooks = books.map((data)=>{
        if(data.image !== undefined){
            return (
                <div>
                    <img src={`data:image/png;base64,${data.image}`}  alt={data.description}></img>
                    <div>{data.name}</div>
                    <label>數量:</label>
                    <input type='text' value={data.quantity} onChange={e=>changeQuantity(data.productId,e.target.value)}></input>
                    <div>價格:{data.price * parseInt(data.quantity)}</div>
                    <button onClick={ e=> deleteBook(data.productId)}>刪除</button>
                </div>
            )
        }
        else{
            return(<div></div>)
        }
       
    })

    const deleteall=()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/shopcar/deleteall',
            data:
            {
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
            }
          }).then((response) => {
            if(response.data.state === 200){
                alert('刪除成功')
                setBooks([''])
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const postBooks = books.map((book)=>{
        var bookInfo = 
        {
            'userName': window.sessionStorage.getItem('userName'),
            'token': window.sessionStorage.getItem('token'),
            'productId': book.productId,
            'quantity':  book.quantity ,
        }
        return(bookInfo);
    })


    const orderBooks=()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/add',
            data:postBooks
          }).then((response) => {
            if(response.data.state === 200){
                alert('下訂成功')
                window.location.href = `/member/order`
                deleteall()
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    return(
    <div>
        <button onClick = {deleteall}>全部刪除</button>
        {listBooks}
        <div>總價格</div>
        <div>{price}</div>
        <button onClick={orderBooks}>下單</button>
    </div>
    )
}
export default ShopCart