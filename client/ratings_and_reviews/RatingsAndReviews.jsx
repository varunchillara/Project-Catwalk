import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';


function RatingsAndReviews() {
  const currentProduct = useSelector(state => state.currentProduct);

  return (
  <div className="ratingsAndReviews">
    {/* <p>{currentProduct.name}</p> */}
    <p1>rating and reviews!!</p1>
  </div>
  );
}

export default RatingsAndReviews;