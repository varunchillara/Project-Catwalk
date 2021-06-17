import React from 'react';
import Carousel from './Carousel.jsx'

const MyOutfitCarousel = (props) => {

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
  let addOutfitCardInlineStyle = {
    width: '170px',
    flex: 1,
    marginTop: '30px',
    marginBottom: '50px',
    flexDirection: 'row',
    justifyContent: 'left',
  }

  let cardRowInlineStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
  }
  let cardTitleInlineStyle = {
    fontFamily : 'Cormorant',
    fontWeight : 'bolder',
    fontSize : '16px'
  }

  return (
<div className="my-outfit-carousel-wrapper">
  <div className="my-outfit-carousel-title" style={cardTitleInlineStyle}>
    MY OUTFIT
  </div>
  <div className="my-outfit-container" style={myOutfitContainer}>
    <div className="add-outfit-card" style={addOutfitCardInlineStyle}>
      {props.addOutfitCard}
    </div>
    <div className="my-outfit-carousel" style={carouselInlineStyle}>
      <div className="card-row" style={cardRowInlineStyle}>
        <Carousel cards={props.myOutfitCards}/>
      </div>
    </div>
  </div>
</div>
  )
}

export default MyOutfitCarousel;