const styleReducer = (state = '', action) => {
  switch(action.type) {
    case 'STYLE' :
      return action.payload;
    default:
      return state;
  }
}

export default styleReducer;