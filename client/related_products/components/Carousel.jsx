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
  const [visibleCards, setVisibleCards] = useState()
  return (
    <>
      {props.cards}
    </>
  )
}




export default Carousel