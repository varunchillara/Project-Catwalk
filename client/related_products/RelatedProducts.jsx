import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';
import axios from 'axios';
import token from '../env/config.js';

function RelatedProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11004`)
    .then((result) => {
      console.log('result.data', result.data);
      dispatch(update(result.data));
    })
  })

  return (
  <div className="relatedProducts">
    <p>related products!!!</p>
  </div>
  );
}

export default RelatedProducts;