import React from 'react';
import {useState} from 'react';
import Card from '../Card.jsx'


class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMoving: false,
      slide: 0,
      cards: [],
      totalCards: 0,
      cardClassName: null,
      cardsHTMLCollection: []
    }

    this.moveNextHandler = this.moveNextHandler.bind(this)
    this.movePrevHandler = this.movePrevHandler.bind(this)
    this.disableInteraction = this.disableInteraction.bind(this)
    this.moveCarouselTo = this.moveCarouselTo.bind(this)
  }


  moveNextHandler () {
    console.log('MOVE NEXT')
    let slideVal = this.state.slide
    if (!this.state.isMoving) {
      slideVal = (slideVal === (this.state.totalCards - 1)) ? 0 : slideVal + 1;

    }
    this.moveCarouselTo(slideVal);
    this.setState({
      slide: slideVal
    });
  }

  movePrevHandler () {
    console.log('MOVE PREVIOUS')
    let slideVal = this.state.slide
    if (!this.state.isMoving) {
      slideVal = (slideVal === 0) ? this.state.totalCards - 1 : slideVal - 1;
    }
    this.moveCarouselTo(slideVal);
    this.setState({
      slide: slideVal
    });
  }

  disableInteraction () {
    console.log('DISABLE INTERACTION')
    this.setState({
      isMoving: true
    });
    setTimeout(()=> {
      this.setState({
        isMoving: false
      });
    }, 500);
  }

  moveCarouselTo (slide) {
    let cardClassName = this.state.cardClassName
    console.log('MOVE CAROUSEL TO')
    if (!this.state.isMoving) {
      this.disableInteraction();
      let newPrevious = slide - 1;
      let newNext = slide + 1;
      let oldPrevious = slide - 2
      let oldNext = slide + 2;

      if ((this.state.totalCards - 1) > 3) {
        if (newPrevious <= 0) {
          oldPrevious = (this.state.totalCards - 1);
        } else if (newNext >= (this.state.totalCards - 1)) {
          oldNext = 0;
        }
        if (slide === 0) {
          newPrevious = (this.state.totalCards - 1);
          oldPrevious = (this.state.totalCards - 2);
          oldNext = (slide + 1);
        } else if (slide === (this.state.totalCards - 1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }
        let cardsArrayCopy = this.state.cardsHTMLCollection;
        console.log(cardsArrayCopy)

        cardsArrayCopy[oldPrevious].className = cardClassName;
        cardsArrayCopy[oldNext].className = cardClassName;
        cardsArrayCopy[newPrevious].className = cardClassName + ' prev';
        cardsArrayCopy[newPrevious].style.transform = 'translateX(-100%)'
        cardsArrayCopy[newPrevious].style.zIndex = 800
        cardsArrayCopy[slide].className = cardClassName + ' active';
        cardsArrayCopy[slide].style.opacity = 1
        cardsArrayCopy[slide].style.position = 'relative'
        cardsArrayCopy[slide].style.zIndex = 900
        cardsArrayCopy[newNext].className = cardClassName + ' next';
        cardsArrayCopy[newNext].style.transform = 'translateX(100%)'
        cardsArrayCopy[newNext].style.zIndex = 800
      }
    }
  }

  componentDidUpdate() {
    let targetClassName = this.props.cards.length ? this.props.cards[0].props.uniqClassName : null;
    if (targetClassName === null) {
      return
    }
    if (this.props.cards.length) {
      let targetClassName = this.props.cards[0].props.uniqClassName
      let collection = Array.from(document.getElementsByClassName(targetClassName))
      let collectionHTML = []
      collection.forEach((element, i) => {if (i % 2 === 0) {collectionHTML.push(element)} })

      if(collectionHTML.length === this.state.cardsHTMLCollection.length && collectionHTML.length > 0) {
        if (collectionHTML.every((element, i) => element.outerHTML === this.state.cardsHTMLCollection[i].outerHTML ? true : false)) {
          return
        }
      } else {
        console.log('STATE IS SET')
        this.setState({
          cardsHTMLCollection: collectionHTML,
          totalCards: collectionHTML.length,
          cardClassName: collectionHTML[0].className
        });
      }
    }

  }


  render () {

    return (
      <CarouselContainer cards={this.props.cards} movePrevHandler={this.movePrevHandler} moveNextHandler={this.moveNextHandler}/>
      )
  }
}


const CarouselContainer = (props) => {

  return (
    <CarouselContainerInner cards={props.cards} movePrevHandler={props.movePrevHandler} moveNextHandler={props.moveNextHandler}/>
  )
}

const CarouselContainerInner = (props) => {

  return (
    <div className="carousel-container-inner" >
      <img className="carousel-prev-button" src="./assets/carouselLeft.png" onClick={props.movePrevHandler}></img>
      {props.cards}
      <img  className="carousel-next-button" src="./assets/carouselRight.png" onClick={props.moveNextHandler}></img>
    </div>
  )
}

export default Carousel