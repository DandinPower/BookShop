import {useEffect, useState} from "react";
import axios from "axios";
const Product =({category})=>{
    const [bookData, setBookData] = useState([""]);
    useEffect(
        ()=>{
            axios({
                method: 'get',
                url: 'http://localhost:5000/product/category/'+category
              })
              .then((result) => {
                  console.log(result.data)
                  setBookData(result.data)})
              .catch((err) => { console.error(err) })
        }
    ,[category])
    const listBooks = bookData.map((data)=>{
        return (
            <div>
                <img src={require(`./${data.image}`).default} alt={data.description}></img>
                <div>{data.name}</div>
                <div>{data.description}</div>
                <div>{data.price}</div>
            </div>)
    })
    return (
        <div>{listBooks}</div>
    )
}
export default Product