import React from 'react';
import Stars from '../../Stars2.jsx';
import ComparisonModal from './ComparisonModal.jsx'

const Card = (props) => {

  let cls = {
    cardClass: props.uniqClassName,
    imageContainerClass: 'image-container',
    imageClass: 'image',
    productInfoClass: 'product-info',
    categoryClass: 'category',
    nameClass: 'name',
    priceClass: 'price',
    ratingClass: 'rating',
    actionClass: null
  }
  let cardClickHandler = props.cardClickHandler
  let overlayButton = props.outfitAdder ? null : props.actionButton
  let actionButtonMouseEnter = props.outfitAdder ? null : props.onMouseEnterHandler;
  let actionButtonMouseLeave = props.outfitAdder ? null : props.onMouseLeaveHandler;
  let id = props.outfitAdder ? "addOutfitCard" : props.relatedProductData.id
  let category = props.outfitAdder ? 'ADD' : props.relatedProductData.category
  let originalPrice = props.outfitAdder ? 'TO OUTFIT' : props.relatedProductData.original_price
  let salePrice = props.outfitAdder ? null : props.relatedProductData.sale_price
  let rating = props.outfitAdder ? null : props.relatedProductData.rating
  let photo = props.outfitAdder ? props.currentProductData.photo || "./images/logo.jpg" : props.relatedProductData.photo || "./images/logo.jpg"
  let name = props.outfitAdder ? props.currentProductData.nameWithText : props.relatedProductData.nameWithText
  let modal = props.outfitAdder ? null : <ComparisonModal
    id={id}
    currentChosenStyleId={props.currentChosenStyleId}
    comparisonId={props.comparisonId}
    relatedProductData={props.relatedProductData}
    currentProductData={props.currentProductData}
    closeCompareModal={props.closeCompareModal}
    />
  if (props.outfitAdder) {

  } else {
    for (let key in cls) {
      cls[key] += ' overview-linked'
    }
    cls.actionClass = overlayButton === './assets/relatedProductACTION.png' ? 'action-modal' : 'action-remove-outfit';
  }

  return (
    <div className={cls.cardClass} >
      {modal}
      <div id={id} className={cls.cardClass} onClick={cardClickHandler} onMouseEnter={props.onMouseEnterHandler} onMouseLeave={props.onMouseLeaveHandler} >
        <div id={id} className={cls.imageContainerClass}>
          <img id={id} className={cls.imageClass} src={photo} alt="NO THUMBNAIL"></img>
          <img id={id} className={cls.actionClass} src={overlayButton} onMouseEnter={actionButtonMouseEnter} onMouseLeave={actionButtonMouseLeave}></img>
        </div>
        <div id={id} className={cls.productInfoClass}>
          <div id={id} className={cls.categoryClass}>
            {category}
          </div>
          <div id={id} className={cls.nameClass}>
            {name}
          </div>
          <div id={id} className={cls.priceClass}>
            {originalPrice}
            {salePrice}
          </div>
          <div id={id} className={cls.ratingClass}>
            <Stars id={id} rating={rating}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;