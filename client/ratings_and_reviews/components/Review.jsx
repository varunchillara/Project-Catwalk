import React from 'react';
import Recommendation from './Recommendation.jsx';
import Stars from '../../sharedComponents/Stars.jsx';

function Review(props) {
  return (
    <div className="review">
      <div className="topOfReview">
        {/* <div className="rating">rating={props.review.rating}</div> */}
        <Stars rating={props.review.rating} />
        <div className="reivewRightSide">
          <div className="reviewerName">{props.review.reviewer_name}, {`${new Date(props.review.date).toDateString()}`}</div>
        </div>
      </div>
      <div className="summary">{props.review.summary}</div>
      <div className="body">{props.review.body}</div>
      <Recommendation recommend={props.review.recommend}/>
      <div className="actions">
        <div className="helpful">Helpful?</div>
        <div className="report">Report</div>
      </div>
      <hr className="breakLine"/>
    </div>
  )
}

export default Review;