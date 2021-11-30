import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Category = () =>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:5000/product/categories/',
          })
          .then((result) => {setData(result)})
          .catch((err) => { console.error(err) })
    },[])
    return (
        <div>{console.log(data)}</div> 
    )
}
export default Category