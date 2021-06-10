import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';
import axios from 'axios';
import token from '../env/config.js';
import averageReviewsCalculator from './helperFunctions.js'

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization : token
};

class cardTemplate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dummyCurrentProductId : 11001,
      dummyRelatedProductsData : []

    }

    this.populateCard = this.populateCard.bind(this);
  }

  populateCard () {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${this.state.dummyCurrentProductId}/related`)
      .then((result) => {
        let dummyRelatedProductIds = result.data
        let relatedProductsData = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}`))
        let relatedProductsThumbnails = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}/styles`))
        let relatedProductsReviews = dummyRelatedProductIds.map(relatedProduct =>
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta`, {params: {
            product_id: relatedProduct
          }}))
        return Promise.all(relatedProductsData.concat(relatedProductsThumbnails).concat(relatedProductsReviews))
        })
      .then(results => {
        let allRelatedProducts = {}
        for (let i = 0; i < results.length; i++) {
          let data = results[i].data;
          let id = data.id || Number(data.product_id);
          //SET THE ID IF IT DOESN'T YET EXIST
          if (allRelatedProducts[id] === undefined) {
            allRelatedProducts[id] = {
              id: id
            }
          }
          //IF IS RATING
          if (data.ratings) {
            allRelatedProducts[id].rating = averageReviewsCalculator.getAverageRating(data.ratings)
          //ELSE IF STYLES
          } else if (data.product_id) {
            let defaultStyleIndex = 0;
            let defaultFound = false
            data.results.some((style, index)=> {
              style['default?'] ? (defaultStyleIndex = index, defaultFound = true) : defaultFound;
              return defaultFound;
            })
            allRelatedProducts[id].original_price = data.results[defaultStyleIndex].original_price
            allRelatedProducts[id].sale_price = data.results[defaultStyleIndex].sale_price
            allRelatedProducts[id].photo = data.results[defaultStyleIndex].photos[0].url
            //ELSE IF PRODUCT_INFO
          } else {
            allRelatedProducts[id].category = data.category
            allRelatedProducts[id].nameWithText = data.name;
          }
        }
        this.setState ({
          dummyRelatedProductsData: Object.values(allRelatedProducts)
        })
        console.log('current State', this.state.dummyRelatedProductsData)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {

    if (Object.keys(this.state.dummyRelatedProductsData).length === 0) {
      this.populateCard();
    }

    return (
    <div>
      {this.state.dummyRelatedProductsData.map(product => <Card key={product.id} data={product}/>)}
    </div>
    )
  }
}

const Card = (props) => {
  let inlineStyle = {
    width: '150px'
  }
  return (
    <div>
      <hr></hr>
      <div><strong>An image</strong></div>
      <img src={props.data.photo} alt="NO THUMBNAIL" style={inlineStyle}></img>
      <div><strong>Category</strong></div>
      {props.data.category}
      <div><strong>Expanded Product Name with extra text</strong></div>
      {props.data.nameWithText}
      <div><strong>Price</strong></div>
      {props.data.original_price}
      {props.data.sale_price}
      <div><strong>Rating</strong></div>
      {props.data.rating}
      <div><strong>Rating TEST</strong></div>
      <Stars rating={props.data.rating}/>
      <hr></hr>
    </div>
  )
}

const Stars = (props) => {
  let rating = props.rating
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating <= 0) {
      stars.push(<Star_EMPTY/>);
    } else if (rating === .25) {
      stars.push(<Star_25/>);
    } else if (rating === .5) {
      stars.push(<Star_50/>);
    } else if (rating === .75) {
      stars.push(<Star_75/>);
    } else {
      stars.push(<Star_FULL/>)
    }
    rating -= 1;
  }
  return (
    <div>
     {stars.map(star => star)}
    </div>
  )
}

let starInlineStyle = {
  width: '20px'
}
const Star_EMPTY = (props) => {
  return (
    <span><img src="./assets/StarEMPTY.png" style={starInlineStyle}></img></span>
  )
}
const Star_FULL = (props) => {
  return (
    <span><img src="./assets/StarFULL.png" style={starInlineStyle}></img></span>
  )
}
const Star_25 = (props) => {
  return (
    <span><img src="./assets/Star25.png" style={starInlineStyle}></img></span>
  )
}
const Star_50 = (props) => {
  return (
    <span><img src="./assets/Star50.png" style={starInlineStyle}></img></span>
  )
}
const Star_75 = (props) => {
  return (
    <span><img src="./assets/Star75.png" style={starInlineStyle}></img></span>
  )
}

export default cardTemplate;




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