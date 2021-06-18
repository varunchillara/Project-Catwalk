import React from 'react';
import Carousel from './Carousel.jsx'

const RelatedProductsCarousel = (props) => {
  let buttonClass = 'relatedProds-';
  let prevButtonClass = props.buttonClass + 'prev-button';
  let nextButtonClass = props.buttonClass + 'next-button';

  return (
    <div className="related-products-carousel-wrapper">
      <div className="related-products-carousel-title" >
        RELATED PRODUCTS
      </div>
      <Carousel cards={props.relatedProductsCards} buttonClass={buttonClass}/>
    </div>
  )
}

export default RelatedProductsCarousel;