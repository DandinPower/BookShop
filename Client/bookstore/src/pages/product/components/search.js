import React, { useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Row, Col, Table, ListGroup, Card, Button, ButtonGroup} from 'react-bootstrap'; 

const Search=({searchInfo,setBookInfo})=>{
    const [books, setBooks] = useState(['']);
    const [category, setCategory] = useState(['']);
    const [categoryBooks,setCategoryBooks] = useState(['']);
    const [selectCate, setSelectCate] = useState('all');
    const [sort,setSort] = useState('Descend');

    useEffect(()=>{
      axios({
          method: 'get',
          url: 'http://localhost:5000/product/categories/',
        })
        .then((result) => {setCategory(result.data)})
        .catch((err) => { console.error(err) })
    },[])

    useEffect(()=>{
        axios({
            method: 'GET',
            url: `http://localhost:5000/product/search/${searchInfo}`,
          }).then((response) => {
            setBooks(response.data)
          })
    },[searchInfo])

    useEffect(()=>{
      if(selectCate === 'all'){
        setCategoryBooks(books)
      }
      else{
        setCategoryBooks(books.filter(book => book.category === selectCate))
      }
    },[selectCate,books])

    console.log(selectCate);
    
    if(sort === 'Descend'){
        books.sort(comparePriceDescend)
    }
    else{
        books.sort(comparePriceAscend)
    }

    function comparePriceDescend(a, b) {
        if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
      }
    
    function comparePriceAscend(a, b) {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    }

    const listCategory = category.map((data) => {
      return <ListGroup.Item action onClick={(e => {setSelectCate(e.target.innerHTML) })}>{data}</ListGroup.Item>
    })

    const ListBooks = categoryBooks.map((book)=>{
        return(
                <Col md="auto">
                    <Card style={{ width: '15rem' }} className="h-100">
                            <Card.Img variant="top" src={`data:image/png;base64,${book.image}`}  alt={book.description} width="180" height="180"/>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center fw-bold Title">{book.name}</Card.Title>
                                <Card.Text as="div" className="fw-light fs-6 Content">{book.description}</Card.Text>
                                <Link to="/Products/product"  className="mt-auto"  >
                                    <Button variant="outline-success" className="w-100" onClick={e => setBookInfo(book)}>馬上購買</Button>
                                </Link>            
                            </Card.Body>
                    </Card>
                </Col>
                
              )
        }
    )

    const ViewBooks =(length)=>{
        if(length === 0){
            return(<h1>{`找不到符合搜尋字詞「${searchInfo}」的書`}</h1>)
        }
        else{
            return(ListBooks)
        }
    }

    return(
      <Table striped bordered hover>
        <tbody>
            <tr>
            <ButtonGroup >
              <Button className="fs-6" variant="outline-success" onClick={e=> setSort('Descend')}>價錢由高到低</Button>
              <Button variant="outline-success" onClick={e=> setSort('Ascend')}>價錢由低到高</Button>
            </ButtonGroup>
            </tr>
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
                          {ViewBooks(books.length)}
                        </Row>
                    </Container>
                </td>
            </tr>
        </tbody>
      </Table>
        
    )
}
export default Search
/*<div>
            <button onClick={e=> setSort('Descend')}>價錢由高到低</button>
            <button onClick={e=> setSort('Ascend')}>價錢由低到高</button>
            {ViewBooks(books.length)}
        </div> 
        
        <div>
                    <div>書名:{book.name}</div>
                    <div>價格:{book.price}</div>
                    <div><img src={`data:image/png;base64,${book.image}`}  alt={book.description} width="200" height="200"></img></div>
                    <Link to="/Products/product">
                        <button  onClick={e => setBookInfo(book)}>馬上購買</button>
                    </Link>  
                    <br/>
                </div>*/