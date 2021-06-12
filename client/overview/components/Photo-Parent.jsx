import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselMain from './Carousel-Main.jsx';
import ProductInfo from './ProductInfo.jsx';

const PhotoParent = () => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[productStyles, setProductStyles] = useState( [] );
  const[style, setStyle] = useState({} );

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
      // console.log('results in parent', result.data.results)
      setProductStyles(result.data.results)
      setStyle(result.data.results[0])
    })
  }, [currentProduct])

  return (
    <div className="overview-main">
      <CarouselMain style={style}/>
      <ProductInfo  productStyles={productStyles} setStyle={setStyle}/>
    </div>
  )
};

export default PhotoParent;