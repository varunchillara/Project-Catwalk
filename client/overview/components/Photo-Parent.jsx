import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselMain from './Carousel-Main.jsx';
import ProductInfo from './ProductInfo.jsx';
import { updateStyle } from '../../../store/actions/updateStyle.js';

const PhotoParent = () => {
  const currentProduct = useSelector(state => state.currentProduct);
  const [productStyles, setProductStyles] = useState( [] );
  const [style, setStyle] = useState( {} );
  const dispatch = useDispatch();

  let currentProd = currentProduct.id || 11004;
  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentProd}/styles`, {
      params: {
        product_id: currentProduct.id || 11004,
        results: currentProduct.results
      }
    })
    .then((result) => {
      //hard coded style to 0 index.  possibly import findDefaultStyleIndex? '../../helperFunctions.js'
      // console.log('results in parent', result.data.results)
      console.log('DOES STYLES  GET FIRED?????')
      setProductStyles(result.data.results);
      setStyle(result.data.results[0]);
      dispatch(updateStyle(result.data.results[0]));
    })
  }, [currentProduct])

  return (
    <div className="overview-main">
      <CarouselMain style={style}/>
      <ProductInfo  productStyles={productStyles} style={style} setStyle={setStyle}/>
    </div>
  )
};

export default PhotoParent;