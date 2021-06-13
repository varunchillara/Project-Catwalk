import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Overview from './overview/components/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';
import {update} from '../store/actions/product.js';

function App () {
  const [currentAppId, setCurrentAppId] = useState(11004);

  const dispatch = useDispatch();

    useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization : token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11004`)
    .then((result) => {
      dispatch(update(result.data));
    })
    .catch(error => {
      console.error(error)
    })
  }, [currentAppId])

  return(
    <div className="App">
      {console.log('***********is it changing??', currentAppId)}
      <Overview />
      <RelatedProducts setCurrentAppId={setCurrentAppId}/>
      <RatingsAndReviews />
    </div>
  );
}

export default App;