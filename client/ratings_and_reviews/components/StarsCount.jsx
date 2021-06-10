import React from 'react';
import Bar from './Bar.jsx';

function StarsCount (props) {
  return (
  <div className="starsCountContainer">
    <div className="starsCount">
      <div className="stars1">5 stars</div>
      <Bar />
    </div>
    <div className="starsCount">
      <div className="stars1">4 stars</div>
      <Bar />
    </div>
    <div className="starsCount">
      <div className="stars1">3 stars</div>
      <Bar />
    </div>
    <div className="starsCount">
      <div className="stars1">2 stars</div>
      <Bar />
    </div>
    <div className="starsCount">
      <div className="stars1">1 stars</div>
      <Bar />
    </div>
  </div>
  );
}

export default StarsCount;