import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';
import axios from 'axios';
import token from '../env/config.js';
import averageReviewsCalculator from './helperFunctions.js'
import Stars from './Stars2.jsx'

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization : token
};

class CardTemplate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dummyCurrentProductId : 11001,
      dummyRelatedProductsData : [],
      myOutfit: []
    }
    this.formatData = this.formatData.bind(this);
    this.fetchRelatedProducts = this.fetchRelatedProducts.bind(this);
    this.findDefaultStyleIndex = this.findDefaultStyleIndex.bind(this);
  }

  formatData (results) {
    let allRelatedProducts = {}
    for (let i = 0; i < results.length; i++) {
      let data = results[i].data;
      let id = data.id || Number(data.product_id);
      if (allRelatedProducts[id] === undefined) {
        allRelatedProducts[id] = {
          id: id
        }
      }
      if (data.ratings) {
        allRelatedProducts[id].rating = averageReviewsCalculator.getAverageRating(data.ratings)
      } else if (data.product_id) {
        let styleIndex = this.findDefaultStyleIndex(data)
        allRelatedProducts[id].original_price = `$${Number(data.results[styleIndex].original_price)}`;
        allRelatedProducts[id].sale_price = data.results[styleIndex].sale_price;
        allRelatedProducts[id].photo = data.results[styleIndex].photos[0].url;
      } else {
        allRelatedProducts[id].category = data.category;
        allRelatedProducts[id].nameWithText = data.name;
      }
    }
    return allRelatedProducts;
  }

  findDefaultStyleIndex (data) {
    let defaultStyleIndex = 0;
    let defaultFound = false
    data.results.some((style, index)=> {
      style['default?'] ? (defaultStyleIndex = index, defaultFound = true) : defaultFound;
      return defaultFound;
    })
    return defaultStyleIndex
  }

  fetchRelatedProducts (results) {
    let dummyRelatedProductIds = results.data
        let relatedProductsData = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}`))
        let relatedProductsThumbnails = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}/styles`))
        let relatedProductsReviews = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta`, {params: {
            product_id: relatedProduct
          }}))
        return Promise.all(relatedProductsData.concat(relatedProductsThumbnails).concat(relatedProductsReviews))
  }

  componentDidMount () {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${this.state.dummyCurrentProductId}/related`)
      .then(results => this.fetchRelatedProducts(results))
      .then(results => {
        this.setState ({
          dummyRelatedProductsData: Object.values(this.formatData(results))
        })
      })
      .catch(error => console.error(error))
  }

  render () {

    let relatedProductsTileInlineStyle = {
      fontFamily : 'Helvetica',
      fontWeight : 'normal',
      fontSize : '12px'
    }

    let carouselInlineStyle = {
      marginTop: '20px',
      marginBottom: '70px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',

    }
    let relatedProductsActionButton = "./assets/relatedProductACTION.png"
    let myOutfitActionButton = "./assets/myOutfitACTION.png"

    return (
    <div>
      <div className="related-products-title" style={relatedProductsTileInlineStyle}>
        RELATED PRODUCTS
      </div>
      <div className="related-products-carousel" style={carouselInlineStyle}>
        {this.state.dummyRelatedProductsData.map(product => <Card key={product.id} data={product} actionButton={relatedProductsActionButton}/>)}
      </div>
      <div className="my-outfit" style={carouselInlineStyle}>
      {this.state.dummyRelatedProductsData.map(product => <Card key={product.id} data={product} actionButton={myOutfitActionButton}/>)}
      </div>
    </div>
    )
  }
}

const Card = (props) => {
  console.log(props.data)
  let cardInlineStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid grey'
  }
  let imageContainerInlineStyle = {
    flex: '5',
    display:'flex',
    justifyContent:'center',
    marginBottom: '10px',
    position: 'relative',
    // backgroundColor: 'rgb(242, 234, 211)',
    backgroundColor: 'rgb(240, 237, 228)',
  }
  let actionButtonInlineStyle = {
    position: 'absolute',
    top:'5%',
    left:'80%',
    width: '23px'
  }
  let imageInlineStyle = {
    alignSelf: 'center',
    width: '170px'
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

  return (
    <div className="card" style={cardInlineStyle}>
      <div className="image-container" style={imageContainerInlineStyle}>
        <img className="image" src={props.data.photo || "./images/logo.jpg"} alt="NO THUMBNAIL" style={imageInlineStyle}></img>
        <img className="action" src={props.actionButton} style={actionButtonInlineStyle}></img>
      </div>
      <div className="product-info" style={productInfoInlineStyle}>
        <div className="category" style={categoryInlineStyle}>
          {props.data.category}
        </div>
        <div className="name" style={nameInlineStyle}>
          {props.data.nameWithText}
        </div>
        <div className="price" style={priceInlineStyle}>
          {props.data.original_price}
          {props.data.sale_price}
        </div>
        <div className="rating">
          <Stars rating={props.data.rating}/>
        </div>
      </div>
    </div>
  )
}


export default CardTemplate;




// function initiateStore() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios.defaults.headers = {
//       'Content-Type': 'application/json',
//       Authorization : token
//     };
//     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11001`)
//     .then((result) => {
//       console.log('result.data', result.data);
//       dispatch(update(result.data));
//     })
//     .catch(error => {
//       console.error(error)
//     })
//   })

//   return (
//   <div className="inititateStore">
//   </div>
//   );
// }