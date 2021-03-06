import { useState,useEffect } from 'react'
import axios from 'axios'
import {Container, Form, Col, Row, Button} from 'react-bootstrap'; 

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
                alert('δΈε³ζε')
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
          alert('θ«δΈε³εη')
        }
    };

    return(
        <Container className='border'>
          <br/>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">ζΈε</Form.Label>
                <Col xs={10}>
                    <Form.Control type='text' value={bookName} onChange={(e) => {setBookName(e.target.value)}}/>
                </Col> 
            </Form.Group>

            <br size="sm"/>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">εεζθΏ°</Form.Label>
                <Col xs={10}>
                    <Form.Control type="text" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </Col> 
            </Form.Group>

            <br size="sm"/>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">εΉζ Ό</Form.Label>
                <Col xs={10}>
                    <Form.Control type='text' value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                </Col> 
            </Form.Group>
            
            <br size="sm"/>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">εεει‘</Form.Label>
                <Col xs={10}>
                    <Form.Control type='text' value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                </Col> 
            </Form.Group>

            <br size="sm"/>
            <Form.Group as={Row}>
                <Form.Label column className="text-center">ζ―ε¦ζεΊ«ε­</Form.Label>
                <Col xs={10}>
                    <Form.Check inline label="ζ―" type="radio" name="status" value='1' onClick={(e) => {setStatus(e.target.value)}} checked={status === '1'}/>
                    <Form.Check inline label="ε¦" type="radio" name="status" value='0' onClick={(e) => {setStatus(e.target.value)}} checked={status === '0'}/>
                </Col>
            </Form.Group>            
            
            <br size="sm"/>
            <Form.Group as={Row} controlId="formFile" className="mb-3">
                <Form.Label column className="text-center">εεεη</Form.Label>
                <Col xs={10}>
                    <Form.Control type="file" accept="image/*"onChange={handleOnPreview}/>
                    <br size="sm"/>
                    <img src={imageSrc} alt="" />
                </Col> 
            </Form.Group>
          </Form>
          
          <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={addProduct}>
                  ζ°ε’εε
              </Button>
          </div>
        </Container>

    )
}
export default AddProduct
/*<div>
                <div>
                    <p>ζΈε: <input type='text' value={bookName} onChange={(e) => {setBookName(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>εεζθΏ°: <input type='text' value={description} onChange={(e) => {setDescription(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>εΉζ Ό: <input type='text' value={price} onChange={(e) => {setPrice(e.target.value)}}></input></p>
                </div>
                <div>
                    <p>εεει‘: <input type='text' value={category} onChange={(e) => {setCategory(e.target.value)}}></input></p>
                </div>
                <div>
                    <div>ζ―ε¦ζεΊ«ε­: 
                        <input type='radio' name="status" value='1' onClick={(e) => {setStatus(e.target.value)}}></input>
                        <label>ζ―</label>
                        <input type='radio' name="status" value='0' onClick={(e) => {setStatus(e.target.value)}}></input>
                        <label>ε¦</label>
                    </div>
                </div>
                <div>
                    <p>εη: <input type="file" accept="image/*"onChange={handleOnPreview}></input></p>
                    <img src={imageSrc} alt="" />
                </div>
                <button onClick={addProduct}>ζ°ε’εε</button>
           </div>*/