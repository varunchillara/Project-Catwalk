import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Rating from './Rating.jsx';
import StarsCount from './StarsCount.jsx';
import Size from './Size.jsx';
import Comfort from './Comfort.jsx';


function MetaReview() {
  const currentProduct = useSelector(state => state.currentProduct);
  const[metaReview, setMetaReview] = useState({});

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
      params: {
        product_id: currentProduct.id || 11004
      }
    })
    .then((result) => {
      setMetaReview(result.data);
    })
  }, [currentProduct])

  return (
    <div className="metaReview">
      <h4 className="ratingsHeader">Ratings & Reviews</h4>
      <Rating />
      <div className="recommendPrecentage">
        100% of reviews recommend this product
      </div>
      <StarsCount />
      {console.log('metareview!!', metaReview)}
      <div className="sizeAndComfort">
        <Size />
        <Comfort />
      </div>
    </div>
  )
}

export default MetaReview;