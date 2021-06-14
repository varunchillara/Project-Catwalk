import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import {useSelector, useDispatch} from 'react-redux';


const RelatedProductsContainer = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const currentStyle = useSelector(state => state.currentStyle);
  return (
    <>
      <RelatedProducts
      currentProduct={currentProduct}
      currentProductStyle={currentStyle}
      setCurrentAppId={props.setCurrentAppId}/>
    </>
  )
}

export default RelatedProductsContainer