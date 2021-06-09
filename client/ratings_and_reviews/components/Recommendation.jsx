import React from 'react';

function Recommendation(props) {
  if (props.recommend) {
    return (<div className="recommendation"><span className="checkMark">&#10004;</span>I recommend this product</div>)
  } else {
    return (<div className="null"></div>)
  }
}

export default Recommendation;