import React, {useState, useEffect} from 'react';
import Recommendation from './Recommendation.jsx';
import Stars2 from '../../Stars2.jsx';
import Report from './Report.jsx';
import axios from 'axios';
import token from '../../env/config.js';


function Review(props) {
  function putHelpful() {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${props.review.review_id}/helpful`)
    .then(() => {
      props.getReviews();
    })
  }
  return (
    <div className="review">
      <div className="topOfReview">
        <Stars2 width="17px" rating={props.review.rating} />
        <div className="reivewRightSide">
          <div className="reviewerName">{props.review.reviewer_name}, {`${new Date(props.review.date).toDateString()}`}</div>
        </div>
      </div>
      <div className="summary">{props.review.summary}</div>
      <div className="body">{props.review.body}</div>
      <Recommendation recommend={props.review.recommend}/>
      <div className="actions">
        <div className="helpful">Helpful?
        <span className="yes" onClick={() => {putHelpful()}}> Yes</span> ({props.review.helpfulness}) |</div>
        <Report reviewId={props.review.review_id} getReviews={props.getReviews}/>
      </div>
      <hr className="breakLine"/>
    </div>
  )
}

export default Review;