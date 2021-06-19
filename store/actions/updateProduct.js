export const updateProduct = (id) => {
  return{
    type: 'UPDATE_PRODUCT',
    payload: id
  }
}