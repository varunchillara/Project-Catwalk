import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Review from './Review.jsx';
import SortOptions from './SortOptions.jsx';
import AddAReview from './AddAReview.jsx';

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
      product_id: currentProduct.id || 11004
    }
  })
  .then((result) => {
    setReviews(result.data.results);
  })
  }, [currentProduct])

  return (
    <div className="Reviews">
      <header className="reviewsHeader">
        {reviews.length} reviews, sorted by<SortOptions />
      </header>
      {reviews.map((review, i) => {
        return <Review key={i} review={review} />
      })}
      <div className="buttons">
        <button className="button">MORE REVIEWS</button>
        <AddAReview id={currentProduct.id}/>
      </div>
    </div>
  )
}

export default ListOfReviews;