import { Carousel,Container,Row,Col} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
import carouselImg1 from './../../image/getImage.jpg';
import carouselImg2 from './../../image/getImage2.jpg';
import carouselImg3 from './../../image/getImage3.jpg';
import carouselImg4 from './../../image/getImage4.jpg';
import './home.css';

const HomeContent = () =>{
    return (
    <Container className='home'> 
        <Row>
                <h1>你好</h1>
        </Row>
        <Row>        

            <Col>
                <Carousel>
                        <Carousel.Item>
                            <img
                            src={carouselImg1}
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            src={carouselImg2}
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            width={750}
                            height={240}
                            src={carouselImg3}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            src={carouselImg4}
                            alt="fourth slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
        </Row>   
    </Container>
    )
}
export default HomeContent