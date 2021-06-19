const productStylesReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_PRODUCT_STYLES' :
      return action.payload;
    case 'UPDATE_ALL':
      return action.payload.currentProductStyles;
    default:
      return state;
  }
}

export default productStylesReducer;