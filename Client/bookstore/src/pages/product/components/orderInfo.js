import React, {useEffect,useState} from 'react'
import axios from 'axios'

const OrderInfo = ({checkOrderInfo})=>{
    const [books, setBooks] = useState(checkOrderInfo);
    const [price, setPrice] = useState();

    function deleteBook (BID){
        setBooks(function (prev){
            return prev.filter(book => book.productId !== BID)
        })
    }


    function changeQuantity(BID,newQ){
        if(newQ > 0)
        {
            setBooks(function (prev){
                    return prev.map((book)=>{
                        if(book.productId === BID){
                            book.quantity = newQ
                        }
                        return(book)
                    })
                })
        }
        else{
            alert('請輸入大於0的數字')
        }
    }

    useEffect(()=>{
        let sum = 0;
        books.forEach(function(book){
            sum += book.price * parseInt(book.quantity);
        })
        setPrice(sum)
    },[books])

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

    const OrderBooks = ()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/add',
            data:postBooks
          }).then((response) => {
            if(response.data.state === 200){
                alert('成功')
                window.location.href = '/member/order'
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const listBooks = books.map((data)=>{
        return (
            <div>
              <div>商品id: {data.productId}</div>
              <div>產品名稱: {data.name}</div>
              <div>產品數量: <input type='number' value={data.quantity} onChange={e => changeQuantity(data.productId,e.target.value)}></input></div>
              <div>產品總價格: {data.price * parseInt(data.quantity)}</div>
              <div><button onClick={e => deleteBook(data.productId)}>刪除</button></div>
            </div>
        )
    })
    return(<div>
            <div>{listBooks}</div>
            <div>付款方式</div>
            <div>配送地址</div>
            <div>產品總價格:{price}</div>
            <div><button onClick={OrderBooks}>下訂</button></div>
           </div>)
}
export default OrderInfo