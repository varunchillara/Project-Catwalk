const axios = require('axios');
const config = require('./config.js');

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: config.token
};

const getListOfReviews = (page, count, sort, productId) => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
    params: {
      page: page,
      count: count,
      sort: sort,
      product_id: productId
    }
  });
};

const getMetaReview = (productId) => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
    params: {
      product_id: productId
    }
  });
};

const postReview = (productId, rating, summary, body, recommend, name, email, photos, characteristics) => {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
    product_id: productId,
    rating: rating,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: photos,
    characteristics: characteristics
  });
};

const reportReview = (id) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${id}/report`);
};

//test api's manually

// getListOfReviews(1, 10, 'newest', 11001)
// .then((result) => {console.log(result.data)});

// getMetaReview(11001)
// .then((result) => {console.log(result.data)})

// postReview(11001, 3, 'this was an alright product!', '', true, 'varun', 'varunkamesh22@gmail.com', [], {}); this end point works!!!
