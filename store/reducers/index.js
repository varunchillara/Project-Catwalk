import productReducer from './product.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentProduct: productReducer
});

export default rootReducer;