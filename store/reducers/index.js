import currentProductReducer from './currentProductReducer.js';
import productStylesReducer from './productStylesReducer.js';
import updateAllReducer from './updateAllReducer.js';
import updateCacheReducer from './updateCacheReducer.js';
import currentMetaReviewsReducer from './currentMetaReviewsReducer.js';
import relatedProductsReducer from './relatedProductsReducer.js'
import currentRatingReducer from './currentRatingReducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentProduct: currentProductReducer,
  currentProductStyles: productStylesReducer,
  currentRating: currentRatingReducer,
  relatedProductsData: relatedProductsReducer,
  currentMetaReviews: currentMetaReviewsReducer,
  cache: updateCacheReducer,
});

export default rootReducer;