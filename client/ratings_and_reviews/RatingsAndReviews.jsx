import React, {useState, useEffect} from 'react';
import MetaReview from './components/MetaReview.jsx'
import ListOfReviews from './components/Reviews.jsx';

function RatingsAndReviews() {
  return (
  <div className="ratingsAndReviews">
    <MetaReview />
    <ListOfReviews />
  </div>
  );
}

export default RatingsAndReviews;