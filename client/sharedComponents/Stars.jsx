import React from 'react';

function Stars(props) {
  let checkedStars = [];
  let uncheckedStars = [];
  for (var i = 0; i < props.rating; i++) {
    checkedStars.push(1);
  }
  for (var i = 0; i < (5 - props.rating); i++) {
    uncheckedStars.push(1);
  }
  return (
    <div className="stars">
      {checkedStars.map((star) => {
        return (<span className="fa fa-star checked star"></span>);
      })}
      {uncheckedStars.map((star) => {
        return (<span className="fa fa-star star"></span>)
      })}
    </div>
  );
}

export default Stars;