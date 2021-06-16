import React from 'react';
import Carousel from './Carousel.jsx'

const RelatedProductsCarousel = (props) => {
  let cardTitleInlineStyle = {
    fontFamily : 'Cormorant',
    fontWeight : 'bolder',
    fontSize : '16px'
  }
  let cardRowInlineStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: '5%'
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
  return (
    <div>
      <div className="related-products-title" style={cardTitleInlineStyle}>
        RELATED PRODUCTS
      </div>
      <div className="related-products-carousel" style={carouselInlineStyle}>
        <img src="./assets/carouselLeft.png" style={carouselLeftButton}></img>
        <div className="card-row" style={cardRowInlineStyle}>
          <Carousel cards={props.relatedProductsCards} style={carouselInlineStyle}/>
        </div>
        <img src="./assets/carouselRight.png" style={carouselRightButton}></img>
      </div>
    </div>
  )
}

export default RelatedProductsCarousel;