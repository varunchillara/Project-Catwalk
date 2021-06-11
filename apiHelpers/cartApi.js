const axios = require('axios');
const config = require('./config.js');

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: config.token
};

const getCart = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/cart');
};

const addToCart = (id) => {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/cart', {sku_id: id});
};

// getCart()
// .then((result) => {console.log(result.data)});
// addToCart(11001)
// .then((result) => {console.log('wat this?', result.data)})