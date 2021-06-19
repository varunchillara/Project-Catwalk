
import averageReviewsCalculator from './averageReviewsCalculator.js'

const dataFormatter = {
  formatData: (rawData) => {
    let formattedData = {}
    let currentlyFormatting
    let isFormattingCurrentProduct = rawData[0] === 'currentProduct' ? true : false;
    rawData = isFormattingCurrentProduct ? rawData.slice(1) : rawData;
    for (let i = 0; i < rawData.length; i++) {
      let data = rawData[i];
      let id = data.id ? data.id
      : data.product_id ? data.product_id
      : data.style_id
      formattedData = dataFormatter.setIdOf(formattedData, isFormattingCurrentProduct, id)
      currentlyFormatting = isFormattingCurrentProduct ? formattedData : formattedData[id]
      currentlyFormatting = dataFormatter.setDataOf(currentlyFormatting, data, isFormattingCurrentProduct);

    }
    return isFormattingCurrentProduct ? currentlyFormatting : formattedData

  },

  setIdOf: (formattedData, isFormattingCurrentProduct, id) => {
    if (isFormattingCurrentProduct) {
      if (formattedData.id === undefined) {
        formattedData.id = id
      }
    } else {
      if (formattedData[id] === undefined) {
        formattedData[id] = {id: id}
      }
    }
    return formattedData
  },

  setDataOf: (currentlyFormatting, unformattedData, isFormattingCurrentProduct) => {
    if (unformattedData.ratings) {
      currentlyFormatting.rating = averageReviewsCalculator.getAverageRating(unformattedData.ratings)
    }
    currentlyFormatting = unformattedData.id ? dataFormatter.pullFromCurrentProductData(currentlyFormatting, unformattedData)
      : currentlyFormatting = dataFormatter.pullFromProductStylesData(currentlyFormatting, isFormattingCurrentProduct, unformattedData)
    return currentlyFormatting;
  },

  pullFromCurrentProductData: (currentlyFormatting, unformattedData) => {
    currentlyFormatting.category = unformattedData.category;
    currentlyFormatting.nameWithText = unformattedData.name;
    currentlyFormatting.features = {};
    unformattedData.features.forEach(item => {currentlyFormatting.features[item['feature']] = item.value})
    return currentlyFormatting;
  },

  pullFromProductStylesData: (currentlyFormatting, isFormattingCurrentProduct, unformattedData, formattingCurrentProduct) => {
    let styleIndex;
    if (!isFormattingCurrentProduct) {
      if (unformattedData.ratings) {
        return currentlyFormatting;
      }
      styleIndex = dataFormatter.findDefaultStyleIndex(unformattedData)
      currentlyFormatting.styles = unformattedData.results
    }
    currentlyFormatting.original_price = isFormattingCurrentProduct ?
    `$${Number(unformattedData.original_price)}` : `$${Number(unformattedData.results[styleIndex].original_price)}`;
    currentlyFormatting.sale_price = isFormattingCurrentProduct ?
      unformattedData.sale_price : unformattedData.results[styleIndex].sale_price;
    currentlyFormatting.photo =  isFormattingCurrentProduct ?
      unformattedData.photos[0].url : unformattedData.results[styleIndex].photos[0].url;
    return currentlyFormatting;
  },

  findDefaultStyleIndex: (data) => {
    let defaultStyleIndex = 0;
    let defaultFound = false
    data.results.some((style, index)=> {
      style['default?'] ? (defaultStyleIndex = index, defaultFound = true) : defaultFound;
      return defaultFound;
    })
    return defaultStyleIndex
  }
}

export default dataFormatter;
