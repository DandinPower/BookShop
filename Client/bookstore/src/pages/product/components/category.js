import React, { useEffect, useState} from 'react'
import axios from 'axios'
const Category = ({selectCate}) =>{
    const [category,setCategory] = useState([''])
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:5000/product/categories/',
          })
          .then((result) => {setCategory(result.data)})
          .catch((err) => { console.error(err) })
    },[])
    const listCategory = category.map((data)=>{
        return <option>{data}</option>
    })
    return (
        <select onChange={(e => selectCate(e.target.value))}>
            <option value='all'>all</option>
            {listCategory}
        </select>
    )
}
export default Category