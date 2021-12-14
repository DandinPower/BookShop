import { useState } from 'react'

const AddProduct = () =>{
    const [bookName,setBookName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [status,setStatus] = useState('')
    const [category,setCategory] = useState('')
    return(<div>
                <div>
                    <p>書名: <input type='text' value={bookName} onChange={(e) => {setBookName(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>商品敘述: <input type='text' value={description} onChange={(e) => {setDescription(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>價格: <input type='text' value={price} onChange={(e) => {setPrice(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>商品分類: <input type='text' value={status} onChange={(e) => {setStatus(e.target.value)}}></input></p>
                </div>
                <div>
                    <div>是否有庫存: 
                        <input type='radio' name="status" value='1' onClick={(e) => {setCategory(e.target.value)}}></input>
                        <label>是</label>
                        <input type='radio' name="status" value='0' onClick={(e) => {setCategory(e.target.value)}}></input>
                        <label>否</label>
                    </div>
                </div>
                <div>
                    <p>圖片: <input type='file' ></input></p>
                </div>
           </div>)
}
export default AddProduct