import React from 'react';
import Carousel from './Carousel.jsx'

const MyOutfitCarousel = (props) => {




  return (
<div className="my-outfit-carousel-wrapper">
  <div className="my-outfit-carousel-title">
    MY OUTFIT
  </div>
  <div className="my-outfit-container">
    <div className="add-outfit-card">
      {props.addOutfitCard}
    </div>
    <div className="my-outfit-carousel">
      <div className="my-outfit-card-row">
        <Carousel cards={props.myOutfitCards}/>
      </div>
    </div>
  </div>
</div>
  )
}

export default MyOutfitCarousel;