const currentRatingReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_RATING' :
      return action.payload;
    default:
      return state;
  }
}

export default currentRatingReducer;