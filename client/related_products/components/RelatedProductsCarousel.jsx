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


  return (
    <div className="related-products-carousel-wrapper">
      <div className="related-products-carousel-title" style={cardTitleInlineStyle}>
        RELATED PRODUCTS
      </div>
      <div className="related-products-carousel" style={carouselInlineStyle}>
        <div className="card-row" style={cardRowInlineStyle}>

          <Carousel cards={props.relatedProductsCards} style={carouselInlineStyle}/>

        </div>
      </div>
    </div>
  )
}

export default RelatedProductsCarousel;