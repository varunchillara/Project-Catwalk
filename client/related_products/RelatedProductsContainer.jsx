import React from 'react';
import RelatedProductsMain from './RelatedProductsMain.jsx';
import {useSelector, useDispatch} from 'react-redux';


const RelatedProductsContainer = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const currentStyle = useSelector(state => state.currentStyle);
  return (
    <div className="relatedProductsContainer">
      <RelatedProductsMain
      currentChosenStyleId={props.currentChosenStyleId}
      currentProduct={currentProduct}
      currentProductStyles={currentStyle}
      setCurrentAppId={props.setCurrentAppId}/>
    </div>
  )
}

export default RelatedProductsContainer