import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';
import axios from 'axios';
import token from '../env/config.js';



function initiateStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization : token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11001`)
    .then((result) => {
      console.log('result.data', result.data);
      dispatch(update(result.data));
    })
    .catch(error => {
      console.error(error)
    })
  })

  return (
  <div className="inititateStore">
  </div>
  );
}

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
    this.getAverageRating = this.getAverageRating.bind(this);
  }

  getAverageRating = (reviews) => {
    let getTotalReviews = (reviews) => {
      let total = 0;
      for (let key in reviews) {
        total += Number(reviews[key]);
      }
      return total;
    }
      let getTotalRatings = (reviews) => {
        let total = 0;
        for (let key in reviews) {
          total += Number(key) * Number(reviews[key]);
        }
      return total;
    }
    return getTotalReviews(reviews) / getTotalRatings(reviews);
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
        // let relatedProductsReviews = dummyRelatedProductIds.map(relatedProduct =>
        //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}/reviews`))
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
            allRelatedProducts[id].rating = this.getAverageRating(results[i].data.ratings)
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
      <hr></hr>
    </div>
  )
}

export default cardTemplate;