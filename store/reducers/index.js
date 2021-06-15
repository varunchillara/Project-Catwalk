import productReducer from './product.js';
import styleReducer from './styleReducer.js';
import updateAllReducer from './updateAllReducer.js';
import updateCacheReducer from './updateCacheReducer.js';
import currentMetaReviewsReducer from './currentMetaReviewsReducer.js';
import ratingReducer from './rating.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentProduct: productReducer,
  currentStyle: styleReducer,
  currentRating: ratingReducer,
  currentMetaReviews: currentMetaReviewsReducer,
  cache: updateCacheReducer,
});

export default rootReducer;