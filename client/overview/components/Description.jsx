import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Features from './Features.jsx';

const Description = () => {
  const currentProduct = useSelector(state => state.currentProduct) ||   {
    data: {slogan: null,
      features: [],
      description: null
    }
  };
  // const[productDescription, setProductDescription] = useState({ features: [] });

  // let currentProd = currentProduct.id || 11004;
  // console.log('currentProduct', currentProduct)
  // useEffect(() => {
  //   axios.defaults.headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: token
  //   };
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${currentProd}`, {
  //     params: {
  //       product_id: currentProduct.id,
  //       slogan: currentProduct.category,
  //       description: currentProduct.name,
  //       features: currentProduct.features
  //     }
  //   })
  //   .then((result) => {
  //     setProductDescription(result.data);
  //   })
  // }, [currentProduct])
  // console.log('productDescrtiptiohs:', productDescription)
  return (
    <div className="description-features">
      <div className="slogan-features">
        <div className="productSlogan">
          <p>{currentProduct.data.slogan}</p>
        </div>
        <div className="productFeatures">
        {currentProduct.data.features.map((feature, i) => {
          return <Features key={i} feature={feature} />
          })
        }
        </div>
      </div>
      <div className="productDescription">
        <p>{currentProduct.data.description}</p>
      </div>
    </div>
  )
};

export default Description;