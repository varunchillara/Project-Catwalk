import React from 'react';
import Stars from '../../sharedComponents/Stars.jsx';

function Rating (props) {
  return (
    <div className="rating">
      <div className="overallRating">4.0</div>
      <div className="starsContainer"><Stars rating={4} /></div>
    </div>
  )
}

export default Rating