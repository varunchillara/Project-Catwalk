import productReducer from './product.js';
import styleReducer from './styleReducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentProduct: productReducer,
  currentStyle: styleReducer
});

export default rootReducer;