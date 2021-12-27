import { useState} from 'react'
import axios from 'axios'
import {Container, Form, Col, Row, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';   

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
                alert('更新成功')
                uploadImage();
            }
            else if(response.data.state === 500){
                alert(response.data.error)
              }
          })
       
    };

    return(
        <Container>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">書名</Form.Label>
                    <Col xs={10}>
                        <Form.Control type="text" value={bookName} onChange={(e) => {setBookName(e.target.value)}}/>
                    </Col> 
                </Form.Group>

                <br size="sm"/>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">商品敘述</Form.Label>
                    <Col xs={10}>
                        <Form.Control type="text" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    </Col> 
                </Form.Group>

                <br size="sm"/>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">價格</Form.Label>
                    <Col xs={10}>
                        <Form.Control type='text' value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                    </Col> 
                </Form.Group>
                
                <br size="sm"/>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">商品分類</Form.Label>
                    <Col xs={10}>
                        <Form.Control type='text' value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                    </Col> 
                </Form.Group>

                <br size="sm"/>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">是否有庫存</Form.Label>
                    <Col xs={10}>
                        <Form.Check inline label="是" type="radio" name="status" value='1' onClick={(e) => {setStatus(e.target.value)}} checked={status === '1'}/>
                        <Form.Check inline label="否" type="radio" name="status" value='0' onClick={(e) => {setStatus(e.target.value)}} checked={status === '0'}/>
                    </Col>
                </Form.Group>
                
                <br size="sm"/>
                <Form.Group as={Row}>
                    <Form.Label column className="text-center">上下架</Form.Label>
                    <Col xs={10}>
                        <Form.Check inline label="上架" type="radio" name="launch" value='1' onClick={(e) => {setLaunch(e.target.value)}} checked={launch === '1'}/>
                        <Form.Check inline label="下架" type="radio" name="launch" value='0' onClick={(e) => {setLaunch(e.target.value)}} checked={launch === '0'}/>
                        <Button size="sm" onClick={UpdateLaunch}>修改狀態</Button>
                    </Col>
                </Form.Group>
                
                <br size="sm"/>
                <Form.Group as={Row} controlId="formFile" className="mb-3">
                    <Form.Label column className="text-center">商品圖片</Form.Label>
                    <Col xs={10}>
                        <Form.Control type="file" accept="image/*"onChange={handleOnPreview}/>
												<br size="sm"/>
												<img src={imageSrc} alt="" />
                    </Col> 
                </Form.Group>
            </Form>
            
            <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={UpdateProduct}>
                  	更改商品資訊
                </Button>
            </div>
        </Container>
    )   
}
export default UpdateProduct
/*
<div>
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
                </div>
                <button onClick={UpdateProduct}>更改商品資訊</button>
             </div>
*/ 