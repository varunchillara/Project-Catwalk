import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselMain from './Carousel-Main.jsx';
import ProductInfo from './ProductInfo.jsx';
import { updateStyle } from '../../../store/actions/updateStyle.js';

const PhotoParent = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const currentStyle = useSelector(state => state.currentStyle) || {data: {results: []}};
  // const currentStyle = useSelector(state => state.currentProductStyles) || {data: {results: []}};

  const [style, setStyle] = useState( currentStyle.data );
  const [productStyles, setProductStyles] = useState( currentStyle.data.results );

  useEffect(() => {
    if (currentStyle.data.results.length) {
      setStyle(currentStyle.data.results[0]);
      setProductStyles(currentStyle.data.results);
    }
  }, [currentStyle])

  return (
    <div className="overview-main">
      <CarouselMain style={style}/>
      <ProductInfo  productStyles={productStyles} style={style} setStyle={setStyle} togglePopupOutfit={props.togglePopupOutfit} isOpenOutfit={props.isOpenOutfit}/>
    </div>
  )
};

export default PhotoParent;