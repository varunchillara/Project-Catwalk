import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Stars from '../../sharedComponents/Stars.jsx';
import SelectStyle from './SelectStyle.jsx';

const ProductInfo = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[productInfo, setProductInfo] = useState({ features: [] });
  const[productStyle, setProductStyle] = useState( );
  const[productPrice, setProductPrice] = useState( );

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11001`, {
      params: {
        product_id: currentProduct.id,
        category: currentProduct.category,
        name: currentProduct.name,
        default_price: currentProduct.default_price
      }
    })
    .then((result) => {
      setProductInfo(result.data);
      // console.log('productList: ', result.data)
    })
  }, [currentProduct])

  useEffect(() => {
    if (props.style.name) {
      setProductStyle(props.style.name);
    }
  }, [props.style.name])

  useEffect(() => {
    if (props.style.sale_price) {
      setProductPrice(props.style.sale_price);
    } else {
      setProductPrice(0);
    }
  }, [props.style.sale_price])

  const selectSize = () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const makeList = (size) => {
      return <option>{size}</option>;
    };
    return <select>{sizes.map(makeList)}</select>;
  }

  const selectQty = () => {
    const qty = ['1','2','3','4','5','6','7','8','9','10','10+'];
    const makeList = (qty) => {
      return <option>{qty}</option>;
    };
    return <select>{qty.map(makeList)}</select>
  }

  const clickImage = (photo) => {
    // console.log('clicked photo: ', photo)
    props.setStyle(photo);
  }

  const priceCheck = () => {
    if (productPrice > 0) {
      return (
        <>
        <span
          style={{ 'textDecoration': 'line-through', 'textDecorationThickness': '2px', 'fontSize': '20px' }}>
          ${props.style.original_price}
        </span>
        <span
          style={{ 'color': 'red', 'paddingLeft': '10px', 'fontSize': '24px', 'fontStyle': 'italic' }}>
          ${productPrice}
        </span>
        </>
      )
    }
    return <span style={{ 'fontSize': '20px' }}>${props.style.original_price}</span>;
  }

  return (
    <div className="styleSide">
      <div className="ratings">
        <Stars rating={1}/>
        Read all reviews
      </div>
      <div className="productCategory">
        <h3>{productInfo.category}</h3>
      </div>
      <div className="productName">
        <h3>{productInfo.name}</h3>
      </div>
      <div className="productPriceDefault">
        {priceCheck()}
      </div>
      <div className="productStyleHeader">
        <span>Selected Style: </span>
        <span style={{ 'color': 'rgb(81, 126, 221', 'fontWeight': 'bold' }}> {productStyle}</span>
      </div>
      <div className="styleThumbsMain">
        {props.productStyles.map((style, i) =>
        <div className="styleThumbs">
          <img key={i} src={style.photos[0].thumbnail_url} height="100px" width="100px" onClick={() => clickImage(style)}/>
        </div>
        )}
      </div>
      <div className="size-quantity">
        <div className="selectSize">
          Select Size{selectSize()}
        </div>
        <div className="selectQty">
          {selectQty()}
        </div>
      </div>
      <div className="bag-outfit">
        <div className="addToBag">
          <button className="button">Add To Bag</button>
        </div>
        <div className="addToOutfit">
          <button className="button">
            <img src="./assets/relatedProductACTION.png" height="30px" width="30px"/>
          </button>
        </div>
      </div>
      <div className="share">
        <button className="button">Instagram</button>
        <button className="button">Pinterest</button>
        <button className="button">Facebook</button>
      </div>
    </div>
  )
};

export default ProductInfo;
