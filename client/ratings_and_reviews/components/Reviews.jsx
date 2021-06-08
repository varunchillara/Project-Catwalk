import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Review from './Review.jsx';

function ListOfReviews() {
  const currentProduct = useSelector(state => state.currentProduct);
  const[reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };

    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
    params: {
      page: 1,
      count: 4,
      sort: 'newest',
      product_id: currentProduct.id || 11001
    }
  })
  .then((result) => {
    console.log('result.data!!!!', result.data.results);
    setReviews(result.data.results);
  })
  }, [currentProduct])

  return (
    <div className="Reviews">
      {reviews.map((review) => {
        return <Review review={review} />
      })}
    </div>
  )
}

export default ListOfReviews;