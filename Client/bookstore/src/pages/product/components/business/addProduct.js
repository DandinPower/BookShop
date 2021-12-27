import { useState,useEffect } from 'react'
import axios from 'axios'

const AddProduct = () =>{
    const [bookName,setBookName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [status,setStatus] = useState('')
    const [category,setCategory] = useState('')
    const [imageSrc, setImageSrc] = useState('');
    const [imageFile, setImageFile] = useState();
    const [productId, setProductId] = useState('');
    const handleOnPreview = (event) => {
        const file = event.target.files[0];
        setImageFile(event.target.files[0])
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          setImageSrc(reader.result)
        }, false);
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    
      useEffect(()=>{
        const formData = new FormData();
        formData.append('image', imageFile);
        axios({
            method: 'POST',
            url: `http://localhost:5000/product/manage/add/image/${productId}`,
            data:formData
          }).then((response) => {
            if(response.data.state === 200){
                alert('上傳成功')
                window.location.href = `/Products/business/manage`
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
        },[productId])

    const addProduct = () =>{
        if(imageFile !== undefined){
            axios({
              method: 'POST',
              url: 'http://localhost:5000/product/manage/add',
              data:{
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
                description: description,
                name: bookName,
                price: price,
                status: status,
                category: category,
              }
            }).then((response) => {
              if(response.data.state === 200){
                  setProductId(response.data.productId)
              }
              else if(response.data.state === 500){
                  alert(response.data.error)
                }
            })
        }
        else{
          alert('請上傳圖片')
        }
    };

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
                    <p>商品分類: <input type='text' value={category} onChange={(e) => {setCategory(e.target.value)}}></input></p>
                </div>
                <div>
                    <div>是否有庫存: 
                        <input type='radio' name="status" value='1' onClick={(e) => {setStatus(e.target.value)}}></input>
                        <label>是</label>
                        <input type='radio' name="status" value='0' onClick={(e) => {setStatus(e.target.value)}}></input>
                        <label>否</label>
                    </div>
                </div>
                <div>
                    <p>圖片: <input type="file" accept="image/*"onChange={handleOnPreview}></input></p>
                    <img src={imageSrc} alt="" />
                </div>
                <button onClick={addProduct}>新增商品</button>
           </div>)
}
export default AddProduct