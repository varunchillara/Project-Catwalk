import React from 'react';

function Review(props) {
  return (
    <div className="review">
      <div className="topOfReview">
        <div className="rating">rating={props.review.rating}</div>
        <div className="reivewRightSide">
          <div className="reviewerName">{props.review.reviewer_name}, {`${new Date(props.review.date).toDateString()}`}</div>
        </div>
      </div>
      <div className="summary">{props.review.summary}</div>
      <div className="body">{props.review.body}</div>
    </div>
  )
}

export default Review;