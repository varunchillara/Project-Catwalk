import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';


function RatingsAndReviews() {
  const currentProduct = useSelector(state => state.currentProduct);

  return (
  <div className="ratingsAndReviews">
    {/* <p>{currentProduct.name}</p> */}
    <p>rating and reviews!!</p>
  </div>
  );
}

export default RatingsAndReviews;