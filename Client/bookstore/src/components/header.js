import { Link } from "react-router-dom";
import {useState,useEffect } from "react/cjs/react.development";
import { Navbar, Container, Nav, Form, NavDropdown, FormControl, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
import Icon1 from "../image/icon.jpg";
const Header = () => {
    const [state, setstate] = useState('');
    useEffect(() => {
        setstate(window.sessionStorage.getItem('userName')) 
      }, [])
      let userName = window.sessionStorage.getItem('userName')
      if(userName === null){
          userName = 'login'
      }
    /*return (
        <div>
            <Button variant="primary"> 幹 </Button>
            <Link to="/"><img style = {{ width: '50px' ,height: '50px'}} src={Icon1} alt="icon"/></Link>
            <Link to="/member/login">登入</Link>
            <Link to="/member/accountInfo">|個人資訊</Link>
            <Link to="/Products/category">|產品</Link>
            <Link to="/Products/shopcart">|購物車</Link>
            <p>{state}</p>
        </div>
    )*/
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