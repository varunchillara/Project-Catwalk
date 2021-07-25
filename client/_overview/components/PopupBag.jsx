import React from 'react';

const PopupBag = (props) => (
  <div className="popup-box">
    <div className="box">
      <span className="close-icon" onClick={props.handleCloseBag}>x</span>
      {props.bagContent}
    </div>
  </div>
  );

export default PopupBag;