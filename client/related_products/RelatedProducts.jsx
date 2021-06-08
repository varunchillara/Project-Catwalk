import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';
import axios from 'axios';
import token from '../env/config.js';


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
        // let relatedProductsReviews = dummyRelatedProductIds.map(relatedProduct =>
        //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${relatedProduct}/reviews`))
        return Promise.all(relatedProductsData.concat(relatedProductsThumbnails))
        })
      .then(results => {


       /*

        {
          11007: {
            image: STYLES,
            category: PRODUCT_INFO,
            nameWithText: PRODUCT_INFO,
            defaultPrice: STYLES,
            salesPrice STYLES,
            rating: RATING
          },
          11008: {
              etc.
          }...
       */

      let allRelatedProducts = {}
      for (let i = 0; i < results.length; i++) {
        let data = {};
        //IF STYLE
        if (results[i].data.id === undefined) {
          //it is a style data
          let defaultStyleIndex = 0;
          //find default style
          results[i].data.results.some((style, index)=> {
            if (style['default?']) {
              defaultStyleIndex = index;
              return true;
            } else {
              return false;
            }
          })
          //add price, sales price, thumbnail
          let id = results[i].data.product_id
          //SET THE ID IF IT DOESN'T YET EXIST
          if (allRelatedProducts[id] === undefined) {
            allRelatedProducts[id] = {}
            allRelatedProducts[id].id = Number(id);
          }
          allRelatedProducts[id].original_price = results[i].data.results[defaultStyleIndex].original_price
          allRelatedProducts[id].sale_price = results[i].data.results[defaultStyleIndex].sale_price
          allRelatedProducts[id].photo = results[i].data.results[defaultStyleIndex].photos[0].url
          //TAKE CARE OF REVIEWS EVENTUALLY
          allRelatedProducts[id].rating = 3;
        } else {
            //IF PRODUCT_INFO
            let id = results[i].data.id
            if (allRelatedProducts[id.toString()] === undefined) {
              allRelatedProducts[id.toString()] = {}
              allRelatedProducts[id.toString()].id = id;
            }
            allRelatedProducts[id].category = results[i].data.category
            allRelatedProducts[id].nameWithText = results[i].data.name;
            //TAKE CARE OF REVIEWS EVENTUALLY
            allRelatedProducts[id].rating = 3;
          }
        }
        this.setState ({
          dummyRelatedProductsData: Object.values(allRelatedProducts)
        })
        console.log(this.state.dummyRelatedProductsData)
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
  return (
    <div>
      <hr></hr>
      <div><strong>An image</strong></div>
      {JSON.stringify(props.photo)}
      <div><strong>Category</strong></div>
      {JSON.stringify(props.data.category)}
      <div><strong>Expanded Product Name with extra text</strong></div>
      {JSON.stringify(props.data.nameWithText)}
      <div><strong>Price</strong></div>
      {JSON.stringify(props.data.orignal_price)}
      {JSON.stringify(props.data.sale_price)}
      <div><strong>Rating</strong></div>
      {JSON.stringify(props.data.rating)}
      <hr></hr>
    </div>
  )
}












// function RelatedProducts() {


//   //useDispatch




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
//   <div className="relatedProducts">
//     <p>related products!!!</p>
//   </div>
//   );
// }

export default cardTemplate;