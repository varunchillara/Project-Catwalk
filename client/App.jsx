
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Overview from './overview/components/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';
import {update} from '../store/actions/product.js';
import {updateStyle} from '../store/actions/updateStyle.js';
import {updateMetaReviews} from '../store/actions/updateMetaReviews.js';
import RelatedProductsContainer from './related_products/RelatedProductsContainer.jsx'

function App () {
  const [currentAppId, setCurrentAppId] = useState(11004);

  const dispatch = useDispatch();

    useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization : token
    };
    let currentMetaReviews = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
      params: {
        product_id: currentAppId || 11004
      }});
    let currentProductInfo = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}`);
    let currentProductStylesInfo = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}/styles`);
    Promise.all([currentProductInfo, currentProductStylesInfo, currentMetaReviews])
    .then((result) => {
      currentProductInfo = result[0]
      currentProductStylesInfo = result[1]
      currentMetaReviews = result[2]
      dispatch(update(currentProductInfo));
      dispatch(updateStyle(currentProductStylesInfo));
      dispatch(updateMetaReviews(currentMetaReviews));
    })
    .catch(error => {
      console.error(error)
    })
  }, [currentAppId])

  return(
    <div className="App">
      <Overview />
      {/* <RelatedProductsContainer setCurrentAppId={setCurrentAppId}/> */}
      <RatingsAndReviews />
    </div>
  );
}

export default App;