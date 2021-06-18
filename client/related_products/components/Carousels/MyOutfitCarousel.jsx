import React from 'react';
import Carousel from './Carousel.jsx'

const MyOutfitCarousel = (props) => {


  let buttonClass = 'myOutfit-';
  let prevButtonClass = props.buttonClass + 'prev-button';
  let nextButtonClass = props.buttonClass + 'next-button';

  return (
    <div className="my-outfit-carousel-wrapper">
      <div className="my-outfit-carousel-title">
        MY OUTFIT
      </div>
      <div className="my-outfit-container">
        <div className="add-outfit-card">
          {props.addOutfitCard}
        </div>
        <Carousel cards={props.myOutfitCards} buttonClass={buttonClass}/>
      </div>
    </div>
  )
}

export default MyOutfitCarousel;