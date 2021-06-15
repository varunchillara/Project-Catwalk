const styleReducer = (state = '', action) => {
  switch(action.type) {
    case 'STYLE' :
      return action.payload;
    case 'UPDATE_ALL':
      return action.payload.currentStyle;
    default:
      return state;
  }
}

export default styleReducer;