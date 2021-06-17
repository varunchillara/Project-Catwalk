import React from 'react';
import Carousel from './Carousel.jsx'

const RelatedProductsCarousel = (props) => {

  return (
    <div className="related-products-carousel-wrapper">
      <div className="related-products-carousel-title" >
        RELATED PRODUCTS
      </div>
      <div className="related-products-carousel">
        <div className="related-products-card-row">
          <Carousel cards={props.relatedProductsCards}/>
        </div>
      </div>
    </div>
  )
}

export default RelatedProductsCarousel;