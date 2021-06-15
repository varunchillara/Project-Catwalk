import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import {useSelector, useDispatch} from 'react-redux';


const RelatedProductsContainer = (props) => {
  // const [communalState, setCommunalState] = useState()
  const currentProduct = useSelector(state => state.currentProduct);
  const currentProductStyles = useSelector(state => state.currentProductStyles);
  return (
    <>
      <RelatedProducts
      currentProduct={currentProduct}
      currentProductStyle={currentProductStyles}
      setCurrentAppId={props.setCurrentAppId}/>
    </>
  )
}

export default RelatedProductsContainer