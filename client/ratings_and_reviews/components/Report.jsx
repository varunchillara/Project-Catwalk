import React from 'react';
import axios from 'axios';
import token from '../../env/config.js';

function Report(props) {
  function clickHandler() {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${props.reviewId}/report`)
    .then(() => {
      props.getReviews();
    })
  }

  return (
    <div className="report" onClick={clickHandler}>Report</div>
  )
}

export default Report;