import React, {useEffect,useState} from 'react'
import axios from 'axios'

const OrderInfo = ({checkOrderInfo})=>{
    const [books, setBooks] = useState(checkOrderInfo);
    const [price, setPrice] = useState();
    const [fullSiteCoupon, setFullSiteCoupon] = useState(['']);
    //取得商家名稱
    var businessNames = [];
    books.forEach(book => {
        if(businessNames.find(e => e === book.businessName) === undefined){
            businessNames.push(book.businessName)
        }
    })

    useEffect(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/customer/all',
            data:{
                userName: window.sessionStorage.getItem('userName'),
                password: window.sessionStorage.getItem('password'),
            }
          }).then((response) => {
            if(response.data.state !== 500){
                setFullSiteCoupon(response.data)
                console.log(response.data);
            }
            else{
                alert(response.data.error)
              }
          })
    },[])
    
    const ListFullSiteCoupon = fullSiteCoupon.map((coupon)=>{
        return(<option value={coupon.discount}>{coupon.code}</option>);
    })

    function deleteBook (BID){
        setBooks(function (prev){
            return prev.filter(book => book.productId !== BID)
        })
    }


    function changeQuantity(BID,newQ){
        if(newQ > 0 || newQ ==='')
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
                setBooks([''])
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const OrderBooks = ()=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/add',
            data:postBooks
          }).then((response) => {
            if(response.data.state === 200){
                alert('成功')
                deleteall()
                window.location.href = '/member/order'
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const FilterNameBooks = businessNames.map((businessName)=>{
       return books.filter(book => book.businessName === businessName)
    })
    
    const ListBooks = (books)=>{
        return(books.map((data)=>{
            return(<div>
                <div>商品id: {data.productId}</div>
                <div>產品名稱: {data.name}</div>
                <div>產品數量: <input type='number' value={data.quantity} onChange={e => changeQuantity(data.productId,e.target.value)}></input></div>
                <div>產品總價格: {data.price * parseInt(data.quantity)}</div>
                <div><button onClick={e => deleteBook(data.productId)}>刪除</button></div>
                <br/>
              </div>)
        }))
    }

    const ListBooksByBusinessName = FilterNameBooks.map((books)=>{
        return(
            <div>
                <div>商店名稱: {books[0].businessName}</div>
                <label>優惠碼: </label>
                <select>
                    <option value=''>不使用</option>
                </select>
                {ListBooks(books)}
            </div>
        )
    })

    return(<div>
            <div>{ListBooksByBusinessName}</div>
            <label>全站優惠碼: </label>
            <select>
                <option value=''>不使用</option>
                {ListFullSiteCoupon}
            </select>
            <div>付款方式</div>
            <div>配送地址</div>
            <div>產品總價格:{price}</div>
            <div><button onClick={OrderBooks}>下訂</button></div>
           </div>)
}
export default OrderInfo
/*
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
*/