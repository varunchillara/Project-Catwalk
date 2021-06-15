
const currentMetaReviewsReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_ALL' :
      return action.payload.currentMetaReviews;
    case 'METAREVIEW' :
      return action.payload;
    default:
      return state;
  }
}

export default currentMetaReviewsReducer;