import React from 'react';

let starInlineStyle = {
  width: '20px'
}

const Star_EMPTY = (props) => {
  return (
    <span><img src="./assets/StarEMPTY.png" style={starInlineStyle}></img></span>
  )
}

const Star_FULL = (props) => {
  return (
    <span><img src="./assets/StarFULL.png" style={starInlineStyle}></img></span>
  )
}

const  Star_25 = (props) => {
  return (
    <span><img src="./assets/Star25.png" style={starInlineStyle}></img></span>
  )
}

const Star_50 = (props) => {
  return (
    <span><img src="./assets/Star50.png" style={starInlineStyle}></img></span>
  )
}

const Star_75 = (props) => {
  return (
    <span><img src="./assets/Star75.png" style={starInlineStyle}></img></span>
  )
}
//Stars component requires props.rating to be a number representing the average rating of the product to the quarter decimal
//To calculate rating at the quarter decimal, import averageReviewsCalculator() from related_products/helperFunctions.js

const Stars = (props) => {
    let rating = props.rating
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating <= 0) {
        stars.push(<Star_EMPTY/>);
      } else if (rating === .25) {
        stars.push(<Star_25/>);
      } else if (rating === .5) {
        stars.push(<Star_50/>);
      } else if (rating === .75) {
        stars.push(<Star_75/>);
      } else {
        stars.push(<Star_FULL/>)
      }
      rating -= 1;
    }
    return (
      <div>
        {stars.map(star => star)}
      </div>
    )
}



export default Stars;