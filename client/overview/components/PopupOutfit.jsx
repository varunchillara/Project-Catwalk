import React from 'react';

const PopupOutfit = (props) => (
  <div className="popup-box">
    <div className="box">
      <span className="close-icon" onClick={props.handleCloseOutfit}>x</span>
      {props.children}
    </div>
  </div>
  );

export default PopupOutfit;