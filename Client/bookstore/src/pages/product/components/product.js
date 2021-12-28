import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { Container, Row, Col, ButtonGroup, Button, ButtonToolbar} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
              <Container className="border" >
                <Row aria-label="product">
                  <Col>
                    <img src={`data:image/png;base64,${bookInfo.image}`}  alt={bookInfo.description} width="500" height="600"></img>
                  </Col>

                  <Col aria-label="productInfo">
                    <br size="lg"/>
                    <Row className="text-center">
                      <h3>{bookInfo.name}</h3>
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
                      </Col>

                      <Col>
                        <Row>
                          <Button variant="outline-success" onClick={addShopCart}>加入購物車</Button>
                        </Row>
                        <br/>
                        <Row>
                          <Button variant="success" onClick={postBook}>直接購買</Button>
                        </Row>
                      </Col>
                    </Row>

                    <br size="lg"/>
                    <Row>
                      <Col className="w-30">
                        <Button onClick={leave}>瀏覽其他商品</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  暫無評論
                  {listComments}
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
        </div>*/ 