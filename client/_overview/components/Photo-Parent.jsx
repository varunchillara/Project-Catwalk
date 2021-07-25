import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselMain from './Carousel-Main.jsx';
import ProductInfo from './ProductInfo.jsx';
import { updateStyle } from '../../../store/actions/updateProductStyles.js';

const PhotoParent = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const currentProductStyles = useSelector(state => state.currentProductStyles) || {data: {results: []}};
  const [style, setStyle] = useState( currentProductStyles.data );
  const [productStyles, setProductStyles] = useState( currentProductStyles.data.results );

  useEffect(() => {
    if (currentProductStyles.data.results.length) {
      setStyle(currentProductStyles.data.results[0]);
      setProductStyles(currentProductStyles.data.results);
    }
  }, [currentProductStyles])

  return (
    <div className="overview-main">
      <CarouselMain style={style}/>
      <ProductInfo  productStyles={productStyles} style={style} setStyle={setStyle} togglePopupOutfit={props.togglePopupOutfit} isOpenOutfit={props.isOpenOutfit}/>
    </div>
  )
};

export default PhotoParent;