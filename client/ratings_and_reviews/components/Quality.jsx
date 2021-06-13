import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function Quality(props) {
  return (
    <div>
    <div className="quality">Quality</div>
    <ArrowMarkerBar value={props.quality}/>
    <div className="sizeRating">
      <div className="poor">Poor</div>
      <div className="perfect1">Perfect</div>
    </div>
  </div>
  )
}

export default Quality;