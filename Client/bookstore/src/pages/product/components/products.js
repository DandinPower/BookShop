import Category from "./category"
import Product from "./product"
import React, {useState} from 'react'
const Products = () => {

    const [selectedCategory,setSelectedCategory] =useState('');

    return (
        <div>
            <Category selectCate ={setSelectedCategory}/>
            <Product category = {selectedCategory}/>
        </div>
    )
}
export default Products