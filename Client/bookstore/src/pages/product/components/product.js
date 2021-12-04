
const Product = ({bookInfo}) =>{
    console.log(bookInfo)
    return(
        <div>
            <img src={require(`./${bookInfo.image}`).default}  alt={bookInfo.description}></img>
            <div>書名: {bookInfo.name}</div>
            <div>產品代號: {bookInfo.productId}</div>
            <div>商家名稱: {bookInfo.businessName}</div>
            <div>價格: {bookInfo.price}</div>
        </div>
    )
}
export default Product