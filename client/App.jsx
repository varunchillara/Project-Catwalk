
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Overview from './overview/components/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';
import {updateAll} from '../store/actions/updateAll.js';
import {updateCache} from '../store/actions/updateCache.js';
import RelatedProductsContainer from './related_products/RelatedProductsContainer.jsx'

function App () {
  const [currentAppId, setCurrentAppId] = useState(11004);
  const [currentChosenStyle, setCurrentChosenStyle] = useState(51174);
  const dispatch = useDispatch();
  console.log('state', currentChosenStyle)

  let cachedData = useSelector(state => state.cache) || null;
  let cachedKeys = Object.keys(cachedData)
  let dataToBeCached = {
    currentProduct: useSelector(state => state.currentProduct),
    currentStyle: useSelector(state => state.currentStyle),
    currentMetaReviews: useSelector(state => state.currentMetaReviews)
  }
  useEffect(() => {
    // console.log(cachedData)
    if (cachedData['11004'] === undefined || cachedData[`${dataToBeCached.currentProduct.data.id}`] === undefined) {
      if (dataToBeCached.currentProduct !== '' || dataToBeCached.currentStyle !== '' || dataToBeCached.currentMetaReviews !== '') {
        cachedData[`${dataToBeCached.currentProduct.data.id}`] = dataToBeCached;
        dispatch(updateCache(cachedData))
      }
    }
    if (cachedData[`${currentAppId}`]) {
      if (cachedData[`${dataToBeCached.currentProduct.data.id}`] === undefined) {
        cachedData[dataToBeCached.currentProduct.data.id] = dataToBeCached;
        dispatch(updateCache(cachedData));
      }
      dispatch(updateAll(cachedData[currentAppId]));
    } else {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization : token
      };
      let currentMetaReviewsData = axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
        params: {
          product_id: currentAppId || 11004
        }
      });
      let currentProductData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}`);
      let currentProductStylesData = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentAppId}/styles`);
      return Promise.all([currentProductData, currentProductStylesData, currentMetaReviewsData])
        .then((result) => {
        let updateAllPayload = {
          currentProduct: result[0],
          currentStyle: result[1],
          currentMetaReviews: result[2]
        }
        dispatch(updateAll(updateAllPayload))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [currentAppId])

  return(
    <div className="App">
      <Overview setCurrentChosenStyle={setCurrentChosenStyle}/>
      <RelatedProductsContainer setCurrentAppId={setCurrentAppId} currentChosenStyleId={currentChosenStyle}/>
      <RatingsAndReviews />
    </div>
  );
}

export default App;