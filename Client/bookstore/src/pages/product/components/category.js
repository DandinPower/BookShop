import React, { useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
        return <option>{data}</option>
    })


    const listBooks = bookData.map((data)=>{
        if(data.image !== undefined){
            return(
                <div>
                    <Link to="/Products/product"><img src={require(`./${data.image}`).default}  alt={data.description} onClick={e => setBookInfo(data)}></img></Link>
                    <div>書名:{data.name}</div>
                    <div>簡述:{data.description}</div>
                    <div>價格:{data.price}</div>
                </div>)
        }
        else{
           return(<div></div>)
        }
    })
    return (
        <div>
            <select onChange={(e) => {setSelectCate(e.target.value)}}>
            <option value='all'>all</option>
            {listCategory}
            </select>
            {listBooks}
        </div>

    )
}
export default Category