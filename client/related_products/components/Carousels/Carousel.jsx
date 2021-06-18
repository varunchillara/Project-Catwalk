import React from 'react';
import {useState} from 'react';
import Card from '../Card.jsx'


class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      outfitIsLargeEnough: false,
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
    this.setHTMLCollection = this.setHTMLCollection.bind(this);
    this.setMyOutfitButtonVisibility = this.setMyOutfitButtonVisibility.bind(this)
    this.setRelatedProdButtonVisibility = this.setRelatedProdButtonVisibility.bind(this)
    this.populateCollection = this.populateCollection.bind(this);
    this.compareStateToProps = this.compareStateToProps.bind(this);
  }

  moveNextHandler () {
    if (this.state.slide + 4 === this.state.totalCards) {
      return;
    }
    let slideVal = this.state.slide
    if (!this.state.isMoving) {
      slideVal += 1;
    }
    this.moveCarouselTo(slideVal, this.state.slide);
    this.setState({
      slide: slideVal
    });
  }

  movePrevHandler () {
    if (this.state.slide === 0) {
      return;
    }
    let slideVal = this.state.slide
    if (!this.state.isMoving) {
      slideVal -= 1;
    }
    this.moveCarouselTo(slideVal, this.state.slide);
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

  moveCarouselTo (slide, oldSlide) {
    let cardClassName = this.state.cardClassName
    console.log(cardClassName)
    let cardRowClassName = (cardClassName === 'relatedProdCard overview-linked') ? 'related-products-card-row' : 'my-outfit-card-row'


    if (!this.state.isMoving) {

      this.disableInteraction();
      let newPrevious = slide - 1;
      let newNext = slide + 4;
      let allCards = this.state.cardsHTMLCollection;

      allCards.forEach((card, i) => {
        if (i >= slide + 4 || i < slide) {
          if (!card.className.includes ('hidden')) {
            card.className = card.className + ' hidden';
          }
        } else if (i >= slide && i < slide + 4) {
          if (card.className.includes ('hidden')) {
            card.className = card.className.substring(0, card.className.length - 7);
          }
        }
      })

      let cardRow = document.getElementsByClassName(cardRowClassName)
      if (slide > oldSlide) {
        //move carousel div leftwards
        cardRow[0].style.transform = 'translateX(-120px)';
      } else {
        //move carousel div rightwards
        cardRow[0].style.transform = 'translateX(120px)';
      }

      let prevButton = document.getElementsByClassName(this.props.buttonClass + 'prev-button')[0]
      let nextButton = document.getElementsByClassName(this.props.buttonClass + 'next-button')[0]

      if (newPrevious < 0) {
        prevButton.style.opacity = '50%'
      }
      if (newPrevious >= 0 ) {
        prevButton.style.opacity = '100%'
      }

      if (newNext === this.state.totalCards) {
        nextButton.style.opacity = '50%'
      }

      if (newNext < this.state.totalCards) {
        nextButton.style.opacity = '100%'
      }
    }
  }

  populateCollection () {

    let targetClassName = this.props.cards[0].props.uniqClassName
    let collection = Array.from(document.getElementsByClassName(targetClassName))
    let collectionHTML = []
    collection.forEach((element, i) => {
      if (i % 2 === 0) {
        collectionHTML.push(element)
      }
    })
    return collectionHTML
  }
  compareStateToProps (collectionHTML) {

    let stateCollection = []
    let propsCollection = []

    this.state.cardsHTMLCollection.forEach(element => {
      let innerHTML = element.innerHTML
      innerHTML = innerHTML.replace('hidden', '');
      stateCollection.push(innerHTML)
    })

    collectionHTML.forEach(element => {
      let innerHTML = element.innerHTML
      innerHTML = innerHTML.replace('hidden', '');
      propsCollection.push(innerHTML)
    })

    if (collectionHTML.length !== this.state.cardsHTMLCollection.length) {
      collectionHTML.forEach((element, i) => {
        element.className = element.className.replace(' hidden', '')
        if(i >= 4) {
          element.className = element.className + ' hidden';
        }
      })

      this.setState({
        cardsHTMLCollection: collectionHTML,
        totalCards: collectionHTML.length,
        cardClassName: collectionHTML[0].className
      });

    } else if (collectionHTML.length === this.state.cardsHTMLCollection.length && this.state.cardsHTMLCollection.length === 0) {
      return
    } else if (collectionHTML.length === this.state.cardsHTMLCollection.length) {
      if (propsCollection.every((element, i) => element === stateCollection[i] ? true : false)) {
        return;
      } else {
        collectionHTML.forEach((element, i) => {
          element.className = element.className.replace(' hidden', '')
          if(i >= 4) {
              element.className = element.className + ' hidden';
          }
        })
        this.setState({
          cardsHTMLCollection: collectionHTML,
          totalCards: collectionHTML.length,
          cardClassName: collectionHTML[0].className
        });
      }
    }
  }
  setRelatedProdButtonVisibility () {
    let prevButton = document.getElementsByClassName(this.props.buttonClass + 'prev-button')
    if (prevButton[0].className === 'myOutfit-prev-button') {
      prevButton[0].style.opacity = '0%'
    } else {
      prevButton[0].style.opacity = '50%'
    }
  }
  setMyOutfitButtonVisibility () {

    let prevButton = document.getElementsByClassName(this.props.buttonClass + 'prev-button')
    let nextButton = document.getElementsByClassName(this.props.buttonClass + 'next-button')

    if (this.state.totalCards < 5) {
      prevButton[0].style.opacity = '0%'
      nextButton[0].style.opacity = '0%'
    } else if(this.state.totalCards >= 5) {
      if (prevButton[0].style.opacity !== '0') {
        return;
      }
      prevButton[0].style.opacity = '50%'
      nextButton[0].style.opacity = '100%'
    }
  }

  setHTMLCollection() {
    let collectionHTML = this.populateCollection();
    if (this.state.totalCards > 0) {
      this.compareStateToProps(collectionHTML);
    }
  }

  componentDidUpdate() {
    if (this.state.isMoving) {
      return;
    }
    if (this.props.buttonClass === 'relatedProds-') {
      if (this.state.slide === 0) {
        this.setRelatedProdButtonVisibility();
      }
    }
    if (this.props.buttonClass === 'myOutfit-') {
      this.setMyOutfitButtonVisibility()
    }
    let targetClassName = this.props.cards.length ? this.props.cards[0].props.uniqClassName : null;
    if (targetClassName === null) {
      return
    }
    if (this.props.cards.length) {
      this.state.totalCards ? this.setHTMLCollection() : this.setState({cards: this.props.cards, totalCards: this.props.cards.length})
    }

  }

  render () {
    let targetClassName = this.props.cards.length ? this.props.cards[0].props.uniqClassName : null;
    let prevButtonClass = this.props.buttonClass + 'prev-button';
    let nextButtonClass = this.props.buttonClass + 'next-button';
    let carouselClass;
    let cardRowClass;

    if (this.props.buttonClass === 'relatedProds-') {
      carouselClass = 'related-products-carousel'
      cardRowClass = 'related-products-card-row'
    } else {
      carouselClass = 'my-outfit-carousel'
      cardRowClass = 'my-outfit-card-row'
    }
    return (
      <div className={carouselClass}>
        <img className={prevButtonClass} src="./assets/carouselLeft.png" onClick={this.movePrevHandler}></img>
        <div className={cardRowClass}>
          <CarouselContainer cards={this.props.cards}/>
        </div>
        <img className={nextButtonClass} src="./assets/carouselRight.png" onClick={this.moveNextHandler}></img>
      </div>
    )
  }
}


const CarouselContainer = (props) => {
  return (
    <div className="carousel-container">
      {props.cards}
    </div>
  )
}

export default Carousel