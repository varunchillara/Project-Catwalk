import React from 'react';
import Stars from '../../Stars2.jsx';
import ComparisonModal from './ComparisonModal.jsx'

const Card = (props) => {

  let cardInlineStyle = {
    border: '1px solid grey',
    top: 0,
    width: '100%',
    margin: 'auto',
    zIndex: 100,
    transition: 'transform .5s, opacity.5s, z-index .5s'
  }
  let imageContainerInlineStyle = {
    flex: 1,
    display:'flex',
    justifyContent:'center',
    marginBottom: '10px',
    position: 'relative',
    height: '255px',
    backgroundColor: 'rgb(240, 237, 228)'
  }
  let actionButtonInlineStyle = {
    position: 'absolute',
    top:'5%',
    left:'80%',
    width: '23px',
    opacity: '50%'
  }
  let imageInlineStyle = {
    alignSelf: 'center',
    width: '170px',
  }
  let productInfoInlineStyle = {
    marginLeft : '8px',
    marginRight : '8px',
    marginBottom: '10px'
  }
  let nameInlineStyle = {
    fontFamily : 'Cormorant',
    justifyContent : 'center',
    fontWeight : 900
  }
  let categoryInlineStyle = {
    fontFamily : 'Cormorant',
    justifyContent : 'center',
    fontWeight : 'normal'
  }
  let priceInlineStyle = {
    fontFamily : 'Cormorant',
    justifyContent : 'center',
    fontWeight : 'normal'
  }
  let ratingInlineStyle = {
    color : 'white',
  }
  let cls = {
    cardClass: 'card',
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
    cardInlineStyle.opacity = '50%'
    categoryInlineStyle.textAlign = 'center'
    nameInlineStyle.textAlign = 'center'
    priceInlineStyle.textAlign = 'center'
  } else {
    for (let key in cls) {
      cls[key] += ' overview-linked'
    }
    cls.actionClass = overlayButton === './assets/relatedProductACTION.png' ? 'action-modal' : 'action-remove-outfit';
  }


  return (
    <div className="card">
      {modal}
      <div id={id} className={cls.cardClass} style={cardInlineStyle} onClick={cardClickHandler} onMouseEnter={props.onMouseEnterHandler} onMouseLeave={props.onMouseLeaveHandler} >
        <div id={id} className={cls.imageContainerClass} style={imageContainerInlineStyle}>
          <img id={id} className={cls.imageClass} src={photo} alt="NO THUMBNAIL" style={imageInlineStyle}></img>
          <img id={id} className={cls.actionClass} src={overlayButton} style={actionButtonInlineStyle} onMouseEnter={actionButtonMouseEnter} onMouseLeave={actionButtonMouseLeave}></img>
        </div>
        <div id={id} className={cls.productInfoClass} style={productInfoInlineStyle}>
          <div id={id} className={cls.categoryClass} style={categoryInlineStyle}>
            {category}
          </div>
          <div id={id} className={cls.nameClass} style={nameInlineStyle}>
            {name}
          </div>
          <div id={id} className={cls.priceClass} style={priceInlineStyle}>
            {originalPrice}
            {salePrice}
          </div>
          <div id={id} className={cls.ratingClass} style={ratingInlineStyle}>
            <Stars id={id} rating={rating}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;