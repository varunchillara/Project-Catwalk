import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';


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
        product_id: currentProduct.id || 11001
      }
    })
    .then((result) => {
      setMetaReview(result.data);
    })
  }, [currentProduct])

  return (
    <div className="metaReview">
      <h4 className="ratingsHeader">Ratings & Reviews</h4>
      <p>{JSON.stringify(metaReview.product_id)}</p>
    </div>
  )
}

export default MetaReview;