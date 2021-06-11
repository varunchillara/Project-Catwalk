import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Stars from '../../sharedComponents/Stars.jsx';
import SelectStyle from './SelectStyle.jsx';

const ProductInfo = () => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[productInfo, setProductInfo] = useState({ features: [] });
  const[productStyle, setProductStyle] = useState( [] );

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
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11001/styles`, {
      params: {
        product_id: currentProduct.id,
        results: currentProduct.results
      }
    })
    .then((result) => {
      setProductStyle(result.data.results)
      console.log('results', result.data.results)
    })
  }, [currentProduct])

  // const stylePreview = (results) => {
  //   var firstFour = [];
  //   var rest = [];

  //   for (let i = 0; i < 3; i++) {
  //     firstFour.push(results.photos[0].thumbnail_url);
  //   }

  //   for (let j = 4; j < results.length; j++) {
  //     rest.push(results.photos[0].thumbnail_url);
  //   }

  //   return (
  //     <>
  //     <div className="styleThumbTop">
  //       {firstFour.map(topPhoto =>
  //         <img src={topPhoto} height="100px" width="80px"/>
  //       )}
  //     </div>
  //     <div className="styleThumbBottom">
  //       {rest.map(bottomPhoto =>
  //         <img src={bottomPhoto} height="100px" width="80px"/>
  //       )}
  //     </div>
  //     </>
  //   )
  // }

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
        <h3>{"Selected Style: (Current Style Placeholder)"}</h3>
      </div>
      <div className="styleThumbsMain">
        {/* {stylePreview(productStyle)} */}
         {productStyle.map((style, i) =>
          <div className="styleThumbs">
            <img key={i} src={style.photos[0].thumbnail_url} height="100px" width="100px"/>
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
