import React from 'react';

let starInlineStyle = {
  width: '15px'
}

const Star_EMPTY = (props) => {
  return (
    <span><img src="./assets/StarEMPTY.png" style={props.starInlineStyle}></img></span>
  )
}

const Star_FULL = (props) => {
  return (
    <span><img src="./assets/StarFULL.png" style={props.starInlineStyle}></img></span>
  )
}

const  Star_25 = (props) => {
  return (
    <span><img src="./assets/Star25.png" style={props.starInlineStyle}></img></span>
  )
}

const Star_50 = (props) => {
  return (
    <span><img src="./assets/Star50.png" style={props.starInlineStyle}></img></span>
  )
}

const Star_75 = (props) => {
  return (
    <span><img src="./assets/Star75.png" style={props.starInlineStyle}></img></span>
  )
}
//Stars component requires props.rating to be a number representing the average rating of the product to the quarter decimal
//To calculate rating at the quarter decimal, import averageReviewsCalculator() from related_products/helperFunctions.js

const Stars = (props) => {

    let starInlineStyle = {
      width: props.width || '15px',
      marginRight: "2px"
    }

    let rating = props.rating
    if (rating === null) {
      return (
        <div>-----</div>
      )
    }
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating <= 0) {
        stars.push(<Star_EMPTY starInlineStyle={starInlineStyle} id={props.id}/>);
      } else if (rating === .25) {
        stars.push(<Star_25 starInlineStyle={starInlineStyle} id={props.id}/>);
      } else if (rating === .5) {
        stars.push(<Star_50 starInlineStyle={starInlineStyle} id={props.id}/>);
      } else if (rating === .75) {
        stars.push(<Star_75 starInlineStyle={starInlineStyle} id={props.id}/>);
      } else {
        stars.push(<Star_FULL starInlineStyle={starInlineStyle} id={props.id}/>)
      }
      rating -= 1;
    }
    let starInlineStyles = {
      display: 'flex',
      flexDirection: 'row'
      }
    return (
      <div style={starInlineStyles}>
        {stars.map((star, i)=> <Star key={i} id={props.id} star={star}/>)}
      </div>
    )
}

const Star = (props) => {

  return (
    <div>
      {props.star}
    </div>

  )
}

export default Stars;