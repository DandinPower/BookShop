import React, { useEffect,useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, ButtonGroup, Form} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';   

const ShopCart = ({setCheckOrderInfo}) => {
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
            if(response.data.state !== 500){
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
        if(newQ >0 || newQ === ''){
          if(newQ >0){
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
              }
              else if(response.data.state === 500){
                  alert(response.data.error)
                }
            })
          }
        }
        else{
          alert('???????????????0?????????')
        }
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
                alert('????????????')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const listBooks = books.map((data)=>{
        if(data.image !== undefined){
            return (
            <tr>
              <td>{data.productId}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td><input type='number' value={data.quantity} onChange={e=>changeQuantity(data.productId,e.target.value)}></input></td>
              <td>{data.price * parseInt(data.quantity)}</td>
              <td><Button variant="outline-danger" onClick={ e=> deleteBook(data.productId)}>??????</Button></td>
            </tr>
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
                setBooks([''])
            }
            else if (response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const OrderBooks =()=>{
      setCheckOrderInfo(books)
    }

    return(<Container >
            <Table bordered className="text-center align-middle">
              <thead>
                  <tr>
                    <th>#</th>
                    <th>??????</th>
                    <th>??????</th>
                    <th>??????</th>
                    <th>??????</th>
                    <th>??????</th>
                  </tr>
              </thead>
              <tbody>
                  {listBooks}
              </tbody>
            </Table>
            <br size="lg"/>
            <hr/>
            
            <div className="d-flex justify-content-end">
              <h3>????????? : {price}</h3>
            </div>        
            <div className="d-flex justify-content-end">
              <Link className="me-2" to="/Products/orderInfo"><Button size="lg" variant='success' onClick={OrderBooks}>??????</Button></Link>
              <Button  size="sm" variant="outline-danger" onClick = {deleteall}>????????????</Button>
            </div>
            
          </Container>
        
    )
}
export default ShopCart
