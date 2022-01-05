import { Carousel, Container, Row, Col, Table, ListGroup, Card, Button} from 'react-bootstrap'; 
import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';   
import {Link} from 'react-router-dom'     
import carouselImg1 from './../../image/getImage.jpg';
import carouselImg2 from './../../image/getImage2.jpg';
import carouselImg3 from './../../image/getImage3.jpg';
import carouselImg4 from './../../image/getImage4.jpg';
import './home.css';
import axios from 'axios'

const HomeContent = ({setBookInfo}) =>{
    const [bookData, setBookData] = useState([""]);
    const [category,setCategory] = useState(['']);
    const [selectCate,setSelectCate] = useState('all');
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:5000/product/categories/',
          })
          .then((result) => {setCategory(result.data)})
          .catch((err) => { console.error(err) })
    },[])
    
    useEffect(
        ()=>{
            axios({
                method: 'get',
                url: 'http://localhost:5000/product/all'
              })
                .then((result) => {
                  setBookData(result.data)
                })
              .catch((err) => { console.error(err) })
        }
    ,[])

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

    const listBooks = bookData.map((data) =>{
      if(data.image != undefined){
        return(
          <Col >
              <Card style={{ width: '10rem' }} className="h-100">
                      <Card.Img variant="top" src={`data:image/png;base64,${data.image}`}  alt={data.description} width="180" height="180"/>
                      <Card.Body className="d-flex flex-column">
                          <Card.Title className="text-center fw-bold">{data.name}</Card.Title>
                          <Card.Text className="fw-light fs-6">{data.description}</Card.Text>
                          <Link to="/Products/product"  className="mt-auto"  >
                                <Button variant="outline-success" className="w-100" onClick={e => setBookInfo(data)}>馬上購買</Button>
                          </Link>
                      </Card.Body>
              </Card>
          </Col>
        )
      }
    })

    const listCategory = category.map((data)=>{
        return <ListGroup.Item action onClick={(e => {setSelectCate(e.target.innerHTML)})}>{data}</ListGroup.Item>
    })

    return (
    <Table striped bordered hover>
        <tbody>
            <tr>   
                <td>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item action onClick={(e => {setSelectCate('all')})}>全部</ListGroup.Item>
                        {listCategory}
                    </ListGroup>
                </td>
                <td>
                    <Container className='home'> 
                      <Row>            
                          <Col>
                              <Carousel>
                                      <Carousel.Item>
                                          <img src={carouselImg1} alt="First slide"/>
                                      </Carousel.Item>
                                      <Carousel.Item>
                                          <img src={carouselImg2}  alt="Second slide"/>
                                      </Carousel.Item>
                                      <Carousel.Item>
                                          <img width={750} height={240} src={carouselImg3} alt="Third slide"/>
                                      </Carousel.Item>
                                      <Carousel.Item>
                                          <img src={carouselImg4} alt="fourth slide"/>
                                      </Carousel.Item>
                              </Carousel>
                          </Col>
                      </Row>
                    </Container>
                    <Container>
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
export default HomeContent
/*<td>
                    
                    <Row>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book1} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book2} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book3} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book4} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book5} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <hr color="000000" size="4"/>
                    </Row>

                    
                    <Row>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book6} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        TOW ROW
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book1} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        TOW ROW
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book2} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        TOW ROW
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book3} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        TOW ROW
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={book4} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                        TOW ROW
                                        </Card.Text>
                                        <Button variant="outline-success">馬上購買</Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </td> */