import React from 'react';

const SelectStyle = ({ style }) => {
  // console.log('style', style)

  console.log('style', style)
  var firstFour = [];
  var rest = [];

  for (let i = 0; i < 3; i++) {
    firstFour.push(style.photos[0].thumbnail_url);
  }

  for (let j = 4; j < styles.length; j++) {
    rest.push(style.photos[0].thumbnail_url);
  }

  return (
    <div className="styleThumb">
    {firstFour.map(topPhoto =>
      <img src={topPhoto} height="100px" width="80px"/>
    )}
    {rest.map(bottomPhoto =>
      <img src={bottomPhoto} height="100px" width="80px"/>
    )}
    </div>
  )
};

export default SelectStyle;