import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Row, Col, Table, Card, Button, ButtonGroup} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

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
                <Col>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={`data:image/png;base64,${data.image}`} />
                        <Card.Body>
                            <Card.Title className="text-center">{data.name}</Card.Title>
                            <Card.Text>價格:{data.price}</Card.Text>
                            <Card.Text>簡述:{data.description}</Card.Text>
                            <Card.Text>id:{data.productId}</Card.Text>
                            <Card.Text>分類:{data.category}</Card.Text>
                            <Card.Text>庫存:{status}</Card.Text>
                            <Card.Text>上下架:{launch}</Card.Text>
                            <Button variant="outline-success">商品更新</Button>
                        </Card.Body>
                    </Card>
                </Col>
              )
      }
      else{
         return(<Col></Col>)
      }
    })

  return( 
          <Container >
            <Row>
              {listBooks}
            </Row>
            <Table bordered className="text-center align-middle">
              <thead>
                <tr>
                  <th>id</th>
                  <th>商品名稱</th>
                  <th>價格</th>
                  <th>簡述</th>
                  <th>分類</th>
                  <th>庫存</th>
                  <th>上下架</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6</td>
                  <td>閣樓房間</td>
                  <td>100</td>
                  <td>超級作家最新力作</td>
                  <td>奇幻童話</td>
                  <td>有</td>
                  <td>上架中</td>
                  <ButtonGroup vertical>
                    <Button variant="outline-success">Update</Button>
                    <Button variant="outline-danger">Delete</Button>
                  </ButtonGroup>
                </tr>
              </tbody>
            </Table>
          </Container>
        )
}
export default ManageProduct