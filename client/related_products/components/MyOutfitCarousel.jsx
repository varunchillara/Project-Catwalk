import React from 'react';
import Carousel from './Carousel.jsx'

const MyOutfitCarousel = (props) => {
  let carouselLeftButton = {
    width: '70px',
    height: '70px',
    alignSelf: 'center',
    position: 'absolute',
    left: '30px',
    zIndex: 1
  }
  let carouselRightButton = {
    width: '70px',
    height: '70px',
    alignSelf: 'center',
    position: 'absolute',
    right: '10%',
    zIndex: 1,
  }
  let myOutfitContainer = {
    display: "flex",
    flexDirection: "row",
    gap: "5%"
  }
  let carouselInlineStyle = {
    overflow: 'hidden',
    width: '100%',
    marginTop: '30px',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
  }

  let cardRowInlineStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: '5%'
  }
  let cardTitleInlineStyle = {
    fontFamily : 'Cormorant',
    fontWeight : 'bolder',
    fontSize : '16px'
  }

  return (
<div>
  <div className="my-outfit-title" style={cardTitleInlineStyle}>
    MY OUTFIT
  </div>
  <div className="my-outfit-container" style={myOutfitContainer}>
    <div className="add-outfit-card" style={carouselInlineStyle}>
      {props.addOutfitCard}
    </div>
    <div className="my-outfit-carousel" style={carouselInlineStyle}>
      <img src="./assets/carouselLeft.png" style={carouselLeftButton}></img>
      <div className="card-row" style={cardRowInlineStyle}>
        <Carousel cards={props.myOutfitCards}/>
      </div>
      <img src="./assets/carouselRight.png" style={carouselRightButton}></img>
    </div>
  </div>
</div>
  )
}

export default MyOutfitCarousel;