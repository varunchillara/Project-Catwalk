import axios from 'axios';
import config from './config.js';

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: config.token
};

const getListOfProducts = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products');
};

const getProduct = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${id}`)
};

const getProductStyles = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${id}/styles`)
};

const getRelatedProducts = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${id}/related`)
};



//test api's manually

// getListOfProducts()
// .then((result) => {console.log(result.data)});
getProduct(11001)
.then((result) => {console.log(result.data)});
// getProductStyles(11001)
// .then((result) => {console.log(result.data)})
// getRelatedProducts(1001)
// .then((result) => {console.log(result.data)})