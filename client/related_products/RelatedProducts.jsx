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
      dummyCurrentProductData: {
        id: '11001',
        category: "Jackets",
        nameWithText: "Camo Onesie",
        photo: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        original_price: '$140',
        sale_price: null,
        comparableAspect1: 'Made from Animals',
        comparableAspect2: 'Edible',
        comparableAspect3: 'Electrically conducive',
        comparableAspect4: 'Rather snazzy'
      },
      dummyRelatedProductsData : {},
      myOutfit: {}
    }
    this.formatData = this.formatData.bind(this);
    this.fetchRelatedProducts = this.fetchRelatedProducts.bind(this);
    this.findDefaultStyleIndex = this.findDefaultStyleIndex.bind(this);
    this.relatedProductsActionButtonHandler = this.relatedProductsActionButtonHandler.bind(this);
    this.myOutfitActionButtonHandler = this.myOutfitActionButtonHandler.bind(this);
    this.addToOutfitHandler = this.addToOutfitHandler.bind(this);
    this.thumbnailCarouselHandler = this.thumbnailCarouselHandler.bind(this)
  }

  formatData (results) {
    let allRelatedProducts = {}
    for (let i = 0; i < results.length; i++) {
      let data = results[i].data;
      let id = data.product_id || data.id.toString();
      if (allRelatedProducts[id] === undefined) {
        allRelatedProducts[id] = {
          id: id
        }
      }
      //DUMMY DATA!!!!!!
      allRelatedProducts[id].comparableAspect1 = 'Edible';
      allRelatedProducts[id].comparableAspect2 = 'Electrically conducive';
      allRelatedProducts[id].comparableAspect3 = 'Rather unattractive';
      //END OF DUMMY DATA
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
          dummyRelatedProductsData: this.formatData(results)
        })
      })
      .catch(error => console.error(error))
  }

  relatedProductsActionButtonHandler (e) {
    let productId = e.target.id
    console.log('LAUNCH COMPAIRSON MODAL')
  }

  thumbnailCarouselHandler (e) {
    console.log('LAUNCH THUMBNAIL CAROUSEL')
  }

  myOutfitActionButtonHandler (e) {
    let productId = e.target.id
    let myOutfit_Copy = this.state.myOutfit;
    delete myOutfit_Copy[productId];
    this.setState({
      myOutfit: myOutfit_Copy
    });

  }

  addToOutfitHandler (e) {
    let id = this.state.dummyCurrentProductData.id
    let chosenOutfitData_Copy = this.state.dummyCurrentProductData
    let myOutfit_Copy = this.state.myOutfit;
    myOutfit_Copy[id] = chosenOutfitData_Copy;
    this.setState({
      myOutfit: myOutfit_Copy
    })
  }

  render () {

    let cardTitleInlineStyle = {
      fontFamily : 'Helvetica',
      fontWeight : 'normal',
      fontSize : '12px'
    }

    let carouselInlineStyle = {
      marginTop: '30px',
      marginBottom: '50px',
      minHeight: '356.5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '100px'

    }

    let spaceInlineStyle = {
      marginLeft: '70px',
      marginRight: '70px'
    }


    let relatedProductsActionButton = "./assets/relatedProductACTION.png"
    let myOutfitActionButton = "./assets/myOutfitACTION.png"
    let relatedProducts = Object.values(this.state.dummyRelatedProductsData)
    let myOutfit = Object.values(this.state.myOutfit)

      if (relatedProducts.length) {
        relatedProducts = relatedProducts.map(product => <Card
          key={product.id}
          data={product}
          actionButton={relatedProductsActionButton}
          thumbnailCarouselHandler={this.thumbnailCarouselHandler}
          actionButtonHandler={this.relatedProductsActionButtonHandler}
          outfitAdder={false}
          />)
      }
      if (myOutfit.length) {
        myOutfit = myOutfit.map(product => <Card
          key={product.id}
          data={product}
          actionButton={myOutfitActionButton}
          actionButtonHandler={this.myOutfitActionButtonHandler}
          outfitAdder={false}
          />)
      }

    return (
    <div>
      <div>
        <div className="related-products-title" style={cardTitleInlineStyle}>
          RELATED PRODUCTS
        </div>
        <div className="related-products-carousel" style={carouselInlineStyle}>
          {relatedProducts}
        </div>
        <div className="my-outfit-title" style={cardTitleInlineStyle}>
          MY OUTFIT
        </div>
        <div className="my-outfit" style={carouselInlineStyle}>
          <Card
            //subject to change
            key={this.state.dummyCurrentProductData.product_id}
            data={this.state.dummyCurrentProductData}
            addToOutfitHandler={this.addToOutfitHandler}
            outfitAdder={true}
            />
          {myOutfit}
        </div>
      </div>
      <div className="space-between-cards" style={spaceInlineStyle}>
      </div>
    </div>
    )
  }
}










const Card = (props) => {
  let wholeCardClick = null;
  let thumbnailCarouselHandler = props.thumbnailCarouselHandler || null;
  let actionButtonHandler = props.actionButtonHandler
  let overlayButton = props.actionButton
  let id = props.data.id
  let category = props.data.category
  let name = props.data.nameWithText
  let originalPrice = props.data.original_price
  let salePrice = props.data.sale_price
  let rating = props.data.rating

  let cardInlineStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid grey',
    justifyContent: 'flex-start'
  }
  let imageContainerInlineStyle = {
    flex: '5',
    display:'flex',
    justifyContent:'center',
    marginBottom: '10px',
    position: 'relative',
    backgroundColor: 'rgb(240, 237, 228)'
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
  console.log(props)

  if (props.outfitAdder) {
    wholeCardClick = props.addToOutfitHandler;
    categoryInlineStyle.textAlign = 'center'
    nameInlineStyle.textAlign = 'center'
    overlayButton = "./assets/addToOutfit.png"
    category = 'ADD TO'
    name = 'OUTFIT'
    originalPrice = null
    salePrice = null
    rating = null

    imageContainerInlineStyle.opacity = '50%';
    actionButtonInlineStyle = {
      position: 'absolute',
      top:'00%',
      width: '200',
      opacity: '80%'
    }
  }

  return (
    <div id={id} className="card" style={cardInlineStyle} onClick={wholeCardClick}>
      <div id={id} className="image-container" style={imageContainerInlineStyle}>
        <img id={id} className="image" src={props.data.photo || "./images/logo.jpg"} alt="NO THUMBNAIL" style={imageInlineStyle} onClick={thumbnailCarouselHandler}></img>
        <img id={id} className="action" src={overlayButton} style={actionButtonInlineStyle} onClick={actionButtonHandler}></img>
      </div>
      <div id={id} className="product-info" style={productInfoInlineStyle}>
        <div id={id} className="category" style={categoryInlineStyle}>
          {category}
        </div>
        <div id={id} className="name" style={nameInlineStyle}>
          {name}
        </div>
        <div id={id} className="price" style={priceInlineStyle}>
          {originalPrice}
          {salePrice}
        </div>
        <div id={id} className="rating">
          <Stars rating={rating}/>
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