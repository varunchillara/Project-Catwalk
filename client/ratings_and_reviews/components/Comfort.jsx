import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function Comfort() {
  return (
    <div>
    <div className="comfort">Comfort</div>
    <ArrowMarkerBar />
    <div className="sizeRating">
      <div className="poor">Poor</div>
      <div className="perfect1">Perfect</div>
    </div>
  </div>
  )
}

export default Comfort;