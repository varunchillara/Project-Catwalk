import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function Length(props) {
  return (
    <div>
      <div className="length">Length</div>
      <ArrowMarkerBar value={props.length}/>
      <div className="sizeRating">
        <div className="tooSmall">Too small</div>
        <div className="perfect">Perfect</div>
        <div className="tooLarge">Too large</div>
      </div>
    </div>
  )
}

export default Length;