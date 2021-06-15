const updateCacheReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_CACHE':
      return action.payload;
    default:
      return state;
  }
}

export default updateCacheReducer;