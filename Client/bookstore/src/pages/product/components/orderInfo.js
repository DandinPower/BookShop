import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Container,Table, Form, Col, Row, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   


const OrderInfo = ({checkOrderInfo})=>{
    const [books, setBooks] = useState(checkOrderInfo);
    const [price, setPrice] = useState();
    const [fullSiteCoupon, setFullSiteCoupon] = useState(['']);
    const [coupons, setCoupons] = useState([]);
    const [useCoupons,setUseCoupons] =useState([]);
    const [checkCoupon,setCheckCoupon] = useState(true);
    //取得商家名稱
    var businessNames = [];
    books.forEach(book => {
        if(businessNames.find(e => e === book.businessName) === undefined){
            businessNames.push(book.businessName)
        }
    })

    const FilterNameBooks = businessNames.map((businessName)=>{
        return books.filter(book => book.businessName === businessName)
     })

     const getCoupons =(id,bname)=>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/event/coupon/customer/product',
            data:{
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
                productId: id,
            }
          }).then((response) => {
            if(response.data.state !== 500){
                let newarray = 
                {
                    'data':response.data,
                    'businessName':bname
                }
                setCoupons(prevArray => [newarray, ...prevArray])
                UseCoupon(bname,'',1)
            }
            else{
                alert(response.data.error)
              }
          })
    }

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
            }
            else{
                alert(response.data.error)
              }
          })
        FilterNameBooks.forEach(book => {
            getCoupons(book[0].productId,book[0].businessName)
        })
        UseCoupon(-1,'',1)
    },[])

    console.log(coupons);
    
    const ListCoupon =(bname)=>{
        let couponById = coupons.filter(coupon => coupon.businessName === bname);
        
        return(couponById.map((coupon)=>{
           return(coupon.data.map((couponInfo)=>{
            return(
            <label>{couponInfo.code}
            <input type='radio' disabled={coupon.quantity === 0} value={couponInfo.discount} name={bname} id={couponInfo.code} onClick={e=> UseCoupon(bname,e.target.id,e.target.value)}>
            </input></label>)
           }))
        }))
    }

    const UseCoupon =(bname,code,discount)=>{
        if(bname === -1){
            let newArray =
            {
            "businessName":'admin',
            'code':code,
            'discount':discount,
            }
            if(useCoupons.find(e => e.businessName === bname) !== undefined){
                setUseCoupons(prevArray => prevArray.filter(e => e.businessName !== bname))
            }
            setUseCoupons(prevArray => [newArray, ...prevArray])
        }
        else{
            let book = books.find(e=>e.businessName ===bname)
            let newArray =
            {
                "businessName":book.businessName,
                'code':code,
                'discount':discount,
            }
            if(useCoupons.find(e => e.businessName === bname) !== undefined){
                setUseCoupons(prevArray => prevArray.filter(e => e.businessName !== bname))
            }
            setUseCoupons(prevArray => [newArray, ...prevArray])
        }
        
    }

    useEffect(()=>{
        let sum = 0;
        books.forEach(function(book){
            let Coupon = useCoupons.find(e=>e.businessName === book.businessName)
            let FullSiteCoupon = useCoupons.find(e=>e.businessName === 'admin')
            try{
                sum += book.price * parseInt(book.quantity) * parseFloat(Coupon.discount)* parseFloat(FullSiteCoupon.discount);
                setPrice(sum)
            }catch (error) {
            }
        })
        if(books.length === 0){
            setPrice(0)
        }
    },[books,useCoupons])
    
   
    const ListFullSiteCoupon = fullSiteCoupon.map((coupon)=>{
        return(<label>{coupon.code}
            <input type='radio' disabled={coupon.quantity === 0} value={coupon.discount} name={-1} id={coupon.code} onClick={e=> UseCoupon(-1,e.target.id,e.target.value)}></input></label>)
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



    const postBooks = books.map((book)=>{
        let Coupon = useCoupons.find(e=>e.businessName === book.businessName)
        let fullSiteCoupon = useCoupons.find(e=>e.businessName === 'admin')
        let discount = 1;
        let fullSiteDiscount = 1;
        try{
             discount = parseFloat(Coupon.discount);
             fullSiteDiscount = parseFloat(fullSiteCoupon.discount);
        }
        catch(error){
        }
        var bookInfo = 
        {
            'userName': window.sessionStorage.getItem('userName'),
            'token': window.sessionStorage.getItem('token'),
            'productId': book.productId,
            'quantity':  book.quantity ,
            'discount': discount * fullSiteDiscount
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
        setCheckCoupon(true);
        useCoupons.forEach((coupon)=>{
            if(coupon.code !== ''){
                axios({
                    method: 'POST',
                    url: 'http://localhost:5000/event/coupon/customer/use',
                    data:
                    {
                        userName: window.sessionStorage.getItem('userName'),
                        token: window.sessionStorage.getItem('token'),
                        code:coupon.code
                    }
                  }).then((response) => {
                    if(response.data.state === 200){
                    }
                    else if (response.data.state === 500){
                        alert(`code:${coupon.code}${response.data.error}`)
                        setCheckCoupon(false);
                      }
                  })
            }
        })
        if(checkCoupon){
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
        
    }
    

    const ListBooks = (books)=>{
        return(books.map((data)=>{
            let Coupon = useCoupons.find(e=>e.businessName === data.businessName)
            let discount = 1;
            try{
                 discount = parseFloat(Coupon.discount);
            }
            catch(error){
            }
            return(
              <Row>
                <Col className="w-20"></Col>
                <Col className="w-20">{data.name}</Col>
                <Col className="w-20"><input type='number' value={data.quantity} onChange={e => changeQuantity(data.productId,e.target.value)}></input></Col>
                <Col>{data.price * parseInt(data.quantity)*(discount)}</Col>
                <Col><Button variant="outline-danger" onClick={e => deleteBook(data.productId)}>Delete</Button></Col>  
              </Row>              
                )
        }))
    }

    const ListBooksByBusinessName = FilterNameBooks.map((books)=>{  
        return(
          <Container bordered>
            <br size="lg"/>
            
            {ListBooks(books)}
            <br size="lg"/>
            <Row className="bg-dark p-2 text-dark bg-opacity-10">  
            <Col className="w-20">商店名稱: {books[0].businessName}</Col>
            <Col className="w-20">優惠碼: {ListCoupon(books[0].businessName)}</Col>
            <Col className="w-20">不使用<input type='radio' value={1} name={books[0].businessName} onClick={e=> UseCoupon(books[0].businessName,'',e.target.value)}></input></Col>
            </Row>
            <br size="lg"/>
            <hr></hr>
          
          </Container>
        )
    })

    return(
    <Container>
      <hr/>  
      {ListBooksByBusinessName}
    </Container>)
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

<div>
                <div>商店名稱: {books[0].businessName}</div>
                <label>優惠碼: </label>
                <label>不使用<input type='radio' value={1} name={books[0].productId} onClick={e=> UseCoupon(books[0].productId,'',e.target.value)}></input></label>
                {ListCoupon(books[0].productId)}
                <label>不使用<input type='radio' value={1} name={books[0].businessName} onClick={e=> UseCoupon(books[0].businessName,'',e.target.value)}></input></label>
                {ListCoupon(books[0].businessName)}
                {ListBooks(books)}
            </div>
*/
/*<div>
            <h1>優惠券使用說明:要先領取該商家的優惠券才能夠使用</h1>
            <div>{ListBooksByBusinessName}</div>
            <label>全站優惠碼: </label>
            <label>不使用<input type='radio' value={1} name={-1} onClick={e=> UseCoupon(-1,'',e.target.value)}></input></label>
 */