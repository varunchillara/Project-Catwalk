import React from 'react';
import RelatedProductsMain from './RelatedProductsMain.jsx';
import {useSelector, useDispatch} from 'react-redux';


const RelatedProductsContainer = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const currentProductStyles = useSelector(state => state.currentProductStyles);
  const currentMetaReviews = useSelector(state => state.currentMetaReviews);
  const relatedProductsData = useSelector(state=> state.relatedProductsData);

  return (
    <div className="relatedProductsContainer">
      <RelatedProductsMain
      currentProduct={currentProduct}
      currentProductStyles={currentProductStyles}
      currentMetaReviews={currentMetaReviews}
      relatedProductsData={relatedProductsData}

      isOpenOutfit={props.isOpenOutfit}
      currentChosenStyleId={props.currentChosenStyleId}
      setCurrentAppId={props.setCurrentAppId}/>
    </div>
  )
}

export default RelatedProductsContainer