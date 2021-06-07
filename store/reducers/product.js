import axios from 'axios';

const productReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE' :
      return action.payload;
    default:
      return '';
  }
}

export default productReducer;