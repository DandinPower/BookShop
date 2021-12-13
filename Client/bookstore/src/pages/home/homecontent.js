import { Carousel,Container,Row,Col,Table} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
import carouselImg1 from './../../image/getImage.jpg';
import carouselImg2 from './../../image/getImage2.jpg';
import carouselImg3 from './../../image/getImage3.jpg';
import carouselImg4 from './../../image/getImage4.jpg';
import './home.css';

const HomeContent = () =>{
    return (
    <Table striped bordered hover>
        <tbody>
            <tr>
                <td>123</td>
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
                </td>
            </tr>
        </tbody>
    </Table>
    )
}
export default HomeContent