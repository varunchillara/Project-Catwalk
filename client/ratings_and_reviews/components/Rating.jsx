import React from 'react';
import Stars from '../../sharedComponents/Stars.jsx';
import helperFunctions from '../../helperFunctions.js';

function Rating (props) {
  let currentRating = helperFunctions.getAverageRating(props.ratings);
  return (
    <div className="rating">
      {/* {console.log('****************!!!!', currentRating)} */}
      <div className="overallRating">{JSON.stringify(currentRating)}</div>
      <div className="starsContainer"><Stars rating={currentRating} /></div>
    </div>
  )
}

export default Rating