import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function Size() {
  return (
    <div>
      <div className="size">Size</div>
      <ArrowMarkerBar />
      <div className="sizeRating">
        <div className="tooSmall">Too small</div>
        <div className="perfect">Perfect</div>
        <div className="tooLarge">Too large</div>
      </div>
    </div>
  )
}

export default Size;