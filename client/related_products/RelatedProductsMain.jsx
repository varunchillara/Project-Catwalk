import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useUpdate} from '../../store/actions/updateProduct.js';
import axios from 'axios';
import token from '../env/config.js';
import averageReviewsCalculator from '../helperFunctions/averageReviewsCalculator.js';
import Card from './components/Card.jsx';
import MyOutfitCarousel from './components/Carousels/MyOutfitCarousel.jsx';
import RelatedProductsCarousel from './components/Carousels/RelatedProductsCarousel.jsx';
import dataFormatter from '../helperFunctions/dataFormatter.js';
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization : token
};





class RelatedProductsMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cache: {},
      currentProductData: {},
      currentProductStyles: {},
      relatedProductsData: {},
      myOutfit: {},
      currentChosenStyleId: null,
      modalId: null
    }
    this.launchCompareModal = this.launchCompareModal.bind(this);
    this.closeCompareModal = this.closeCompareModal.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.determineAction = this.determineAction.bind(this);
    this.updateOverviewProduct = this.updateOverviewProduct.bind(this);
    this.updateChosenStyleId = this.updateChosenStyleId.bind(this);
  }

  updateChosenStyleId (styleId) {
    if (styleId !== this.state.currentChosenStyleId) {
      this.setState({
        currentChosenStyleId: styleId,
        currentChosenStyle: this.state.currentProductStyles[`${styleId}`]
      })
    }
  }

  updateOverviewProduct (currentProductData, currentProductStylesData, currentMetaReviews, relatedProductsData, currentChosenStyleId) {
    if (currentProductStylesData === '' || currentProductStylesData.data.product_id === this.state.currentProductData.id ) {
      return;
    }
    if (Object.keys(this.state.currentProductStyles).length) {
      this.updateChosenStyleId(currentChosenStyleId);
    }
    let currentProduct = ['currentProduct', currentProductData.data]
    if (currentProduct[1].id === this.state.currentProductData.id) {
      return;
    }
    let currentProductStyles = {}
    let relatedProducts = relatedProductsData.map(result => result.data)
    currentProductStylesData.data.results.forEach(style => currentProductStyles[`${style.style_id}`] = style)
    let defaultStyleIndex = dataFormatter.findDefaultStyleIndex(currentProductStylesData.data)
    let currentProductDefaultStyle = currentProductStylesData.data.results[defaultStyleIndex]
    let formattedRelatedProductsData = dataFormatter.formatData(relatedProducts);
    let formattedCurrentProductsData = dataFormatter.formatData(currentProduct.concat(currentProductDefaultStyle));
    this.setState({
      currentProductData: formattedCurrentProductsData,
      relatedProductsData: formattedRelatedProductsData,
      currentProductStyles: currentProductStyles
    })
  }

  removeOutfit (productId) {
    let myOutfit_Copy = this.state.myOutfit;
    delete myOutfit_Copy[productId];
    this.setState({
      myOutfit: myOutfit_Copy
    });
  }

  launchCompareModal (currentProductData, relatedProductId) {
    if (this.state.modalId !== null) {
      return;
    }
    this.setState({
      modalId: relatedProductId
    })
  }

  closeCompareModal (e) {
    let modals = document.getElementsByClassName('comparison-modal')
    e.target.style.display = 'none';
    this.setState({
      modalId: null
    })
  }

  addToOutfit (productData, myOutfit) {
    let id = productData.id
    let chosenOutfitData_Copy = productData
    let myOutfit_Copy = myOutfit
    myOutfit_Copy[id] = chosenOutfitData_Copy;
    this.setState({
      myOutfit: myOutfit_Copy
    })
  }

  determineAction (className, productId) {
    className === 'action-modal' ? this.launchCompareModal(this.state.currentProductData, productId) : this.removeOutfit(productId)
  }

  thumbnailCarouselHandler (e) {
    //THIS FUNCTION SHOULD DEAL WITH A LAUNCHED THUMBNAIL CAROUSEL
    //PERHAPS A CLICK FUNCTION?  PERHAPS A HOVER FUNCTION?
  }

  onMouseEnterHandler (e) {
    let id = this.state.currentProductData.id
    if (e.target.className.includes('overview-linked')) {
    } else if (e.target.className.includes('action')) {
      e.target.style.opacity='100%'
    } else {
      let card = document.getElementById('addOutfitCard')
      card.style.opacity='100%';
    }
  }

  onMouseLeaveHandler (e) {
    if (e.target.className.includes('overview-linked')) {
    } else if (e.target.className.includes('action')) {
      e.target.style.opacity='50%'
    } else {
      let card = document.getElementById('addOutfitCard')
      card.style.opacity='50%';
    }
  }

  cardClickHandler (e) {
    let className = e.target.className;
    let productId = e.target.id;
    if (e.target.className.includes('overview-linked')) {
      ///THIS FUNCTION IS PASSED DOWN FROM APP.
      // this.updateOverviewProduct(e.target.id);
      this.props.setCurrentAppId(e.target.id);
    } else if (className.includes('action')) {
      this.determineAction(className, productId)
    } else {
      this.addToOutfit(this.state.currentProductData, this.state.myOutfit)
    }
  }

  componentDidUpdate () {
    this.updateOverviewProduct(this.props.currentProduct, this.props.currentProductStyles, this.props.currentMetaReviews, this.props.relatedProductsData, this.props.currentChosenStyleId)
  }
  componentDidMount () {
    this.updateOverviewProduct(this.props.currentProduct, this.props.currentProductStyles, this.props.currentMetaReviews, this.props.relatedProductsData, this.props.currentChosenStyleId)
  }

  render () {

    // console.log(this.state)

    if (this.props.isOpenOutfit) {
      // console.log('YAAAAY')
    }

    let modalCompareButton = "./assets/relatedProductACTION.png";
    let removeOutfitButton = "./assets/myOutfitACTION.png";
    let addOutfitCard = null;
    let relatedProductsCards = Object.values(this.state.relatedProductsData).length ? Object.values(this.state.relatedProductsData) : [];
    let myOutfitCards = Object.values(this.state.myOutfit).length ? Object.values(this.state.myOutfit) : []
    let currentProductData = (this.state.currentProductData);

    if (relatedProductsCards !== null) {
        relatedProductsCards = relatedProductsCards.map(product => <Card
          key={product.id}
          uniqClassName={'relatedProdCard'}
          currentChosenStyleId={this.props.currentChosenStyleId}
          relatedProductData={product}
          actionButton={modalCompareButton}
          closeCompareModal={this.closeCompareModal}
          cardClickHandler={this.cardClickHandler}
          onMouseEnterHandler={this.onMouseEnterHandler}
          onMouseLeaveHandler={this.onMouseLeaveHandler}
          outfitAdder={false}
          comparisonId={this.state.modalId}
          currentProductData={currentProductData}
          />)
        }
      if (myOutfitCards !== null) {
        myOutfitCards = myOutfitCards.map(product => <Card
          key={product.id}
          uniqClassName={'myOutfitCard'}
          relatedProductData={product}
          currentProductData={currentProductData}
          actionButton={removeOutfitButton}
          cardClickHandler={this.cardClickHandler}
          onMouseEnterHandler={this.onMouseEnterHandler}
          onMouseLeaveHandler={this.onMouseLeaveHandler}
          outfitAdder={false}
          />)
      }
      if (this.state.currentProductData.id) {
        addOutfitCard =  <Card
          key={this.state.currentProductData.product_id}
          uniqClassName={'addOutfitCard'}
          currentProductData={this.state.currentProductData}
          cardClickHandler={this.cardClickHandler}
          onMouseEnterHandler={this.onMouseEnterHandler}
          onMouseLeaveHandler={this.onMouseLeaveHandler}
          outfitAdder={true}
        />
      }

    return (
      <div className="related-products-wrapper">
        <RelatedProductsCarousel
          relatedProductsCards={relatedProductsCards}
          modalCompareButton={modalCompareButton}
          currentProductData={currentProductData}
          />
        <MyOutfitCarousel
          myOutfitCards={myOutfitCards}
          addOutfitCard={addOutfitCard}
          removeOutfitButton={removeOutfitButton}
          currentProductData={currentProductData}
          />
      </div>
    )
  }
}


export default RelatedProductsMain;

