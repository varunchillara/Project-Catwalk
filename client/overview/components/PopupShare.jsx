import React from 'react';

const PopupShare = (props) => (
  <div className="popup-box">
    <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
      {props.shareContent}
    </div>
  </div>
  );

export default PopupShare;