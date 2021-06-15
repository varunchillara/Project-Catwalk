const styleReducer = (state = '', action) => {
  switch(action.type) {
    case 'STYLE' :
      return action.payload;
    case 'UPDATE_ALL':
      return action.payload.currentProductStyles;
    default:
      return state;
  }
}

export default styleReducer;