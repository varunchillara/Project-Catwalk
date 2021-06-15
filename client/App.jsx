
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Overview from './overview/components/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';
import {updateAll} from '../store/actions/updateAll.js';
import RelatedProductsContainer from './related_products/RelatedProductsContainer.jsx'

function App () {
  const [currentAppId, setCurrentAppId] = useState(11004);

  const dispatch = useDispatch();

    useEffect(() => {
    //attempt to pull down from cache at key currentAppId.
    //let cachedData = useSelector(state => state.cachedData);
    //if it comes back with the data (SHOULD BE STORED AS JSON)

    //if (cachedData[currentAppId]) {
      //FIRE UPDATE_ALL with the data
      // dispatch(updateAll(JSON.parse(cachedData[currentAppId])))
    // }

    //otherwise
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization : token
    };
    let currentMetaReviewsData = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
      params: {
        product_id: currentAppId || 11004
      }});
    let currentProductData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}`);
    let currentProductStylesData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}/styles`);
    Promise.all([currentProductData, currentProductStylesData, currentMetaReviewsData])
    .then((result) => {

      let updateAllPayload = {
        currentProduct: result[0],
        currentStyle: result[1],
        currentMetaReviews: result[2]
      }
      //prepare cached data

      // cachedData[`${currentAppId}`] = JSON.stringify(updateAllPayload);

      dispatch(updateAll(updateAllPayload));
      //dispatch(updateCache(cachedData))
    })
    .catch(error => {
      console.error(error)
    })
  }, [currentAppId])

  return(
    <div className="App">
      <Overview />
      <RelatedProductsContainer setCurrentAppId={setCurrentAppId}/>
      <RatingsAndReviews />
    </div>
  );
}

export default App;