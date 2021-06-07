import React from 'react';
import Overview from './overview/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';

function App () {
  return(
    <div className="App">
      <Overview />
      <RelatedProducts />
      <RatingsAndReviews />
    </div>
  );
}

export default App;