import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
const Header = () => {
    let userName = window.sessionStorage.getItem('userName')
    if(userName === null){
        userName = 'login'
    }
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">克萊柏</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/member/login">{userName}</Nav.Link>
                    <Nav.Link href="/member/accountInfo">個人資訊</Nav.Link>
                    <Nav.Link href="/Products/category">產品</Nav.Link>
                    <Nav.Link href="/Products/shopcart">購物車</Nav.Link>
                    <Nav.Link href="/member/order">order</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="light">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header