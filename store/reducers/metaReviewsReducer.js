
const metaReviewsReducer = (state = '', action) => {

  switch(action.type) {
    case 'UPDATE_ALL' :
      return state;
    case 'METAREVIEW' :
      return action.payload;
    default:
      return state;
  }
}

export default metaReviewsReducer;