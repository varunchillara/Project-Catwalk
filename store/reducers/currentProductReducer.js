
const currentProductReducer = (state = '', action) => {

  switch(action.type) {
    case 'UPDATE_ALL':
      return action.payload.currentProduct;
    case 'UPDATE_PRODUCT' :
      return action.payload;
    default:
      return state;
  }
}

export default currentProductReducer;