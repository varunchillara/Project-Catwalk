import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Stars from '../../sharedComponents/Stars.jsx';
import SelectStyle from './SelectStyle.jsx';

const ProductInfo = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[productInfo, setProductInfo] = useState({ features: [] });
  const[productStyle, setProductStyle] = useState(props.productStyles);

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
    // console.log('clicked image: ', photo)
    props.setStyle(photo)
    // setImageUrl(url);
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
        <h3>{productInfo.default_price}</h3>
      </div>
      <div className="productStyleHeader">
        {/* {productStyle[0].name} */}
        <h3>{`Selected Style: placeholder`}</h3>
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
          <button className="button">+</button>
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
