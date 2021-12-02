import {useEffect, useState} from "react";
import axios from "axios";
const Product =({category})=>{
    const [bookData, setBookData] = useState([""]);
    let url;
    if(category === 'all'){
        url = 'http://localhost:5000/product/';
    }
    else{
        url = 'http://localhost:5000/product/category/';
    }
    useEffect(
        ()=>{
            axios({
                method: 'get',
                url: url+category
              })
              .then((result) => {
                  console.log(result.data)
                  setBookData(result.data)})
              .catch((err) => { console.error(err) })
        }
    ,[category,url])
    const listBooks = bookData.map((data)=>{
        if(data.image !== undefined){
            return(
                <div>
                    <img src={require(`./${data.image}`).default} alt={data.description}></img>
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
        <div>{listBooks}</div>
    )
}
export default Product