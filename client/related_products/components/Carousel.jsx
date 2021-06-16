import React from 'react';
import {useState} from 'react';
import Card from './Card.jsx'


const Carousel = (props) => {


  let cardsInThisCarousel = props.cards
  let totalCards = props.cards.length
  let slide = 0;
  let moving = true;





  let carouselContainerInlineStyle = {
    transformStyle: 'preserve-3d'
  }

  return (
     <CarouselContainer cards={props.cards} style={carouselContainerInlineStyle}/>
  )
}


const CarouselContainer = (props) => {

  return (
    <CarouselContainerInner cards={props.cards} />
  )
}

const CarouselContainerInner = (props) => {

  let carouselLeftButton = {
    width: '70px',
    height: '70px',
    alignSelf: 'center',
    position: 'relative',
    left: '30px',
    zIndex: 1001
  }
  let carouselRightButton = {
    width: '70px',
    height: '70px',
    alignSelf: 'center',
    position: 'relative',
    right: '30px',
    zIndex: 1001,
  }
  return (
    <>
      <img src="./assets/carouselLeft.png" style={carouselLeftButton}></img>
      {props.cards}
      <img src="./assets/carouselRight.png" style={carouselRightButton}></img>
    </>
  )
}




export default Carousel