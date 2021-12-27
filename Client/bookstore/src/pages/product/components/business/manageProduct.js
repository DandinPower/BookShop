import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Col, Table, Button, ButtonGroup} from 'react-bootstrap'; 
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
                <tr>
                  <td>{data.productId}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.description}</td>
                  <td>{data.category}</td> 
                  <td>{status}</td>
                  <td>{launch}</td>
                  <ButtonGroup vertical>

                  <Link to="/Products/business/updateproduct">
                    <Button variant="outline-success" onClick={e => setProductInfo(data)}>
                      Update
                    </Button>
                  </Link>
                    <br/>
                    <Button variant="outline-danger">Delete</Button>
                  </ButtonGroup>
                </tr>
              )
      }
      else{
         return(<Col></Col>)
      }
    })

  return( 
          <Container >
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
                {listBooks}
              </tbody>
            </Table>
            <Button variant='success' href="/Products/business/addproduct">
              新增商品
            </Button>
          </Container>
        )
}
export default ManageProduct
/*
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

 <Link to="/Products/business/updateproduct"><img src={`data:image/png;base64,${data.image}`}  alt={data.description} onClick={e => setProductInfo(data)}></img></Link>
 */ 