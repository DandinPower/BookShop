import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { Container, Row, Col, Button, Table, ButtonGroup} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from 'react-router-dom'

const Product = ({bookInfo,setCheckOrderInfo}) =>{
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
        var book = 
        [
          {
            'productId': bookInfo.productId,
            'businessName':  bookInfo.businessName ,
            'name':  bookInfo.name ,
            'price':  bookInfo.price ,
            'image':  bookInfo.image ,
            'quantity': '1' ,
          }
        ]
        
        setCheckOrderInfo(book);
    }
    const listComments = comments.map((data)=>{
        return(
            <tr>  
                <td>{data.name}</td>
                <td>{data.star}</td>
                <td>{data.comment}</td>
            </tr>
          ) 
    })

    return(
              <Container className="border" >
                <Row aria-label="product">
                  <Col>
                    <img src={`data:image/png;base64,${bookInfo.image}`}  alt={bookInfo.description} width="500" height="600"></img>
                  </Col>

                  <Col aria-label="productInfo">
                    <br size="lg"/>
                    <Row className="text-center">
                      <h3 className='fw-bold'>{bookInfo.name}</h3>
                    </Row>
                    <hr/>
                    <Row>
                      <Col>
                        <Row>
                          <p>價格: {bookInfo.price}</p>
                        </Row>
                        <Row>
                          <p>商家名稱: {bookInfo.businessName}</p>
                        </Row>
                        <Row>
                          <p>產品敘述: {bookInfo.description}</p>
                        </Row>
                        <Row>
                          <p>庫存狀態: {bookInfo.status}</p>
                        </Row>
                      </Col>

                      <Col>
                        <ButtonGroup>
                          <Button className="me-2 " variant="outline-success" onClick={addShopCart} disabled={window.sessionStorage.getItem('type') !== 'customer'}>加入購物車</Button>
                          <Link to="/Products/orderInfo" onClick={postBook}><Button className="btn-block" variant="success" disabled={window.sessionStorage.getItem('type') !== 'customer'}>直接購買</Button></Link>
                        </ButtonGroup>
                      </Col>
                    </Row>

                    <br size="lg"/>
                    <Row className="align-bottom">
                      <Col className="w-30 d-flex justify-content-end">
                        <Button onClick={leave}>瀏覽其他商品</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <br size='lg'/>
                <Row className='text-center'>
                  <Table >
                    <thead className='fw-bold'>
                      <tr>
                        <td>買家名字</td>
                        <td>評等</td>
                        <td>評論</td>
                      </tr>
                    </thead>
                    <tbody>
                      {listComments}
                    </tbody>
                  </Table>
                </Row>

              </Container>   
    )
}
export default Product
/*<div>
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

            <thead>
                    <tr>
                      <td>買家名字</td>
                      <td>評等</td>
                      <td>評論</td>
                    </tr>
                  </thead>
                  <tbody>
                    {listComments}
                  </tbody>
        </div>
<Button variant="success" onClick={postBook} disabled={window.sessionStorage.getItem('type') !== 'customer'}><Link to="/Products/orderInfo">直接購買</Link></Button>*/ 