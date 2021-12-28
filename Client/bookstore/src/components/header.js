import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';        
import Logo from '../image/icon.jpg'
const Header = () => {
    let userName = window.sessionStorage.getItem('userName')
    let userType = window.sessionStorage.getItem('type')
    let logout ='登出'
    if(userName === null){
        userName = 'login'
        logout =''
    }

    const logOut=()=>{
        window.sessionStorage.clear()
        window.location.href = `/member/login`
    }
    
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/"> <img width="85" height="80"  src={Logo}  alt="logo" /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/member/login" disabled={userName !== 'login'}>{userName}</Nav.Link>
                    <Nav.Link onClick={logOut}>{logout}</Nav.Link>
                    <Nav.Link href="/member/accountInfo">個人資訊</Nav.Link>
                    <Nav.Link href="/Products/category">產品</Nav.Link>
                    <Nav.Link href="/Products/shopcart" disabled={userType !== 'customer'}>購物車</Nav.Link>
                    <Nav.Link href="/member/order" disabled={userType !== 'customer'}>order</Nav.Link>
                    <Nav.Link href="/Products/business/manage" disabled={userType !== 'business'}>管理商品</Nav.Link>
                    <Nav.Link href="/Products/business/manageorder" disabled={userType !== 'business'}>管理訂單</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="搜尋"
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