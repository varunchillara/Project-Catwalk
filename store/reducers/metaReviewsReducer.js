
const metaReviewsReducer = (state = '', action) => {
  switch(action.type) {
    case 'METAREVIEW' :
      return action.payload;
    default:
      return state;
  }
}

export default metaReviewsReducer;