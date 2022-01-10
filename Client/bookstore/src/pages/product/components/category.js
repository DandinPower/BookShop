import React, { useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './../../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Row, Col, Table, ListGroup, Card, Button} from 'react-bootstrap'; 

const Category = ({setBookInfo}) =>{
    const [category,setCategory] = useState([''])
    const [selectCate,setSelectCate] = useState('all')
    const [bookData, setBookData] = useState([""]);
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:5000/product/categories/',
          })
          .then((result) => {setCategory(result.data)})
          .catch((err) => { console.error(err) })
    },[])

    let url;
    if(selectCate === 'all'){
        url = 'http://localhost:5000/product/';
    }
    else{
        url = 'http://localhost:5000/product/category/';
    }
    
    useEffect(
        ()=>{
            axios({
                method: 'get',
                url: url+selectCate
              })
              .then((result) => {
                  setBookData(result.data)
                })
              .catch((err) => { console.error(err) })
        }
    ,[selectCate,url])

    const listCategory = category.map((data)=>{
        return <ListGroup.Item action onClick={(e => {setSelectCate(e.target.innerHTML)})}>{data}</ListGroup.Item>
    })


    const listBooks = bookData.map((data)=>{
        if(data.image !== undefined){
            return(
                <Col  md="auto">
                    <Card style={{ width: '15rem' }} className="h-100">
                            <Card.Img variant="top" src={`data:image/png;base64,${data.image}`}  alt={data.description} width="180" height="180"/>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center fw-bold Title">{data.name}</Card.Title>
                                <Card.Text as="div" className="fw-light fs-6 Content">{data.description}</Card.Text>
                                <Link to="/Products/product"  className="mt-auto"  >
                                    <Button variant="outline-success" className="w-100" onClick={e => setBookInfo(data)}>馬上購買</Button>
                                </Link>            
                            </Card.Body>
                    </Card>
                </Col>
                )
        }
        else{
           return(<Col></Col>)
        }
    })

    return (
        <Table striped bordered hover>
        <tbody>
            <tr>   
                <td width={"200px"}>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item action onClick={(e => {setSelectCate('all')})}>全部</ListGroup.Item>
                        {listCategory}
                    </ListGroup>
                </td>
                <td>
                    <Container className='home'> 
                        <Row>
                          {listBooks}
                        </Row>
                    </Container>
                </td>
            </tr>
        </tbody>
        </Table>
    )
}
export default Category
/*
                <div>
                    <Link to="/Products/product"><img src = {`data:image/png;base64,${data.image}`}  alt={data.description} onClick={e => setBookInfo(data)}></img></Link>
                    <div>書名:{data.name}</div>
                    <div>簡述:{data.description}</div>
                    <div>價格:{data.price}</div>
                </div>
<div>
            <select onChange={(e) => {setSelectCate(e.target.value)}}>
            <option value='all'>all</option>
            {listCategory}
            </select>
            {listBooks}
        </div> */