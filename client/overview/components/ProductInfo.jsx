import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Stars from '../../sharedComponents/Stars.jsx';
import SelectStyle from './SelectStyle.jsx';

const ProductInfo = (props) => {
  const currentProduct = useSelector(state => state.currentProduct) || { data: {style: {category: null, name: null}} };
  const currentRating = useSelector(state => state.currentRating);
  const[productStyle, setProductStyle] = useState( );
  const[productPrice, setProductPrice] = useState( );
  const[productSkus, setProductSkus] = useState( {} );
  const[styleSku, setStyleSku] = useState()
  const[quantity, setQuantity] = useState([])
  console.log('props', props)

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

  useEffect(() => {
    if (props.style.skus) {
      setProductSkus(props.style.skus);
      setQuantity(['0','1','2'])
    }
  }, [props.style.skus])

  // const selectSize = (size) => {
  //   setStyleSku(size)
  // }

  const selectQuantity = () => {
    let skus = Object.values(productSkus);
    for (let i = 0; i < skus.length; i++) {
      var qty;
      if (skus[i].quantity < 10) {
        qty = new Array(skus[i].quantity).fill(true).map((num, i) => i + 1);
      } else {
        qty = new Array(10).fill(true).map((num, i) => i + 1);
      }
    }
    console.log('selected', qty);
    setQuantity(qty);
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
        <Stars rating={currentRating}/>
        Read all reviews
      </div>
      <div className="productCategory">
        <h3>{currentProduct.data.category}</h3>
      </div>
      <div className="productName">
        <h3>{currentProduct.data.name}</h3>
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
        <div className="styleThumbs" key={i}>
          <img src={style.photos[0].thumbnail_url} height="100px" width="100px" onClick={() => clickImage(style)}/>
        </div>
        )}
      </div>
      <div className="size-quantity">
        <select
          className="selectSize" onChange={() => selectQuantity()}>
          {Object.values(productSkus).map((sku, i) =>
            <option key={i}> {sku.size} </option>
          )}
        </select>
        <select className="selectQty">
          {quantity.map((qty, i) =>
            <option key={i}> {qty}</option>
          )}
        </select>
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
        <img src="../../../public/images/instagram.jpg" height="40px" width="40px" />
        <button className="button">Instagram</button>
        <button className="button">Pinterest</button>
        <button className="button">Facebook</button>
      </div>
    </div>
  )
};

export default ProductInfo;
