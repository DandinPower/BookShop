import React, { useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Search=({searchInfo,setBookInfo})=>{
    const [books, setBooks] = useState(['']);
    const [sort,setSort] = useState('Descend');
    useEffect(()=>{
        axios({
            method: 'GET',
            url: `http://localhost:5000/product/search/${searchInfo}`,
          }).then((response) => {
            setBooks(response.data)
          })
    },[searchInfo])
    
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

    const ListBooks = books.map((book)=>{
        return(
                <div>
                    <div>書名:{book.name}</div>
                    <div>價格:{book.price}</div>
                    <div><img src={`data:image/png;base64,${book.image}`}  alt={book.description} width="200" height="200"></img></div>
                    <Link to="/Products/product">
                        <button  onClick={e => setBookInfo(book)}>馬上購買</button>
                    </Link>  
                    <br/>
                </div>
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
        <div>
            <button onClick={e=> setSort('Descend')}>價錢由高到低</button>
            <button onClick={e=> setSort('Ascend')}>價錢由低到高</button>
            {ViewBooks(books.length)}
        </div>
    )
}
export default Search