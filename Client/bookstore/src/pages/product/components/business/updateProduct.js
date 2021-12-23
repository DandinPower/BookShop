import { useState } from 'react'
import axios from 'axios'

const UpdateProduct = ({productInfo}) =>{
    const [bookName,setBookName] = useState(productInfo.name)
    const [description,setDescription] = useState(productInfo.description)
    const [price,setPrice] = useState(productInfo.price)
    const [status,setStatus] = useState(productInfo.status)
    const [category,setCategory] = useState(productInfo.category)
    const [imageSrc, setImageSrc] = useState(productInfo.image);
    const [imageFile, setImageFile] = useState();
    const [productId, setProductId] = useState(productInfo.productId);
    const [launch, setLaunch] = useState(productInfo.launch);

    const handleOnPreview = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          setImageSrc(reader.result)
        }, false);
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    const uploadImage = () =>{
        const formData = new FormData();
        formData.append('image', imageFile);
        console.log(productId);
        console.log(imageFile);
        axios({
            method: 'POST',
            url: `http://localhost:5000/product/manage/update/image/${productId}`,
            data:formData
          }).then((response) => {
            if(response.data.state === 200){
                alert('圖片上傳成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const UpdateLaunch = () =>{
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/manage/launch',
            data:{
                userName: window.sessionStorage.getItem('userName'),
                token: window.sessionStorage.getItem('token'),
                productId: productId,
                launch: launch,
              }
          }).then((response) => {
            if(response.data.state === 200){
                alert('更改成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
    }

    const UpdateProduct = () =>{

        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/manage/update',
            data:{
              userName: window.sessionStorage.getItem('userName'),
              token: window.sessionStorage.getItem('token'),
              productId: productId,
              description: description,
              name: bookName,
              price: price,
              status: status,
              category: category,
            }
          }).then((response) => {
            if(response.data.state === 200){
                setProductId(response.data.productId)
                alert('更新成功')
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
       
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
                        <input type='radio' name="status" value='1' onClick={(e) => {setStatus(e.target.value)}} checked={status === '1'}></input>
                        <label>是</label>
                        <input type='radio' name="status" value='0' onClick={(e) => {setStatus(e.target.value)}} checked={status === '0'}></input>
                        <label>否</label>
                    </div>
                </div>
                <div>
                    <div>上下架: 
                        <input type='radio' name="launch" value='1' onClick={(e) => {setLaunch(e.target.value)}} checked={launch === '1'}></input>
                        <label>上架</label>
                        <input type='radio' name="launch" value='0' onClick={(e) => {setLaunch(e.target.value)}} checked={launch === '0'}></input>
                        <label>下架</label>
                        <button onClick={UpdateLaunch}>修改狀態</button>
                    </div>
                </div>
                <div>
                    <p>圖片: <input type="file" accept="image/*"onChange={handleOnPreview}></input></p>
                    <img src={imageSrc} alt="" />
                    <button onClick={uploadImage}>修改圖片</button>
                </div>
                <button onClick={UpdateProduct}>更改商品</button>
             </div>)
        
        
}
export default UpdateProduct