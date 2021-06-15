const updateAllReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_ALL' :
      return state;
    default:
      return state;
  }
}

export default updateAllReducer;