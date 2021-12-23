import { Carousel, Container, Row, Col, Table, ListGroup, Card, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
import carouselImg1 from './../../image/getImage.jpg';
import carouselImg2 from './../../image/getImage2.jpg';
import carouselImg3 from './../../image/getImage3.jpg';
import carouselImg4 from './../../image/getImage4.jpg';
import book1 from './../../image/book1.jpg';
import book2 from './../../image/book2.jpg';
import book3 from './../../image/book3.jpg';
import book4 from './../../image/book4.jpg';
import book5 from './../../image/book5.jpg';
import book6 from './../../image/book6.jpg';
import './home.css';

const HomeContent = () =>{
    return (
    <Table striped bordered hover>
        <tbody>
            <tr>   
                <td>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item action>電子書</ListGroup.Item>
                        <ListGroup.Item action>一般書籍</ListGroup.Item>
                        <ListGroup.Item action>電子產品</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
                        <ListGroup.Item action>家具</ListGroup.Item>
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
                </td>
            </tr>
        </tbody>
    </Table>
    )
}
export default HomeContent