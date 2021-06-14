

const averageReviewsCalculator = {
  findDefaultStyleIndex: (data) => {
      let defaultStyleIndex = 0;
      let defaultFound = false
      data.results.some((style, index)=> {
        style['default?'] ? (defaultStyleIndex = index, defaultFound = true) : defaultFound;
        return defaultFound;
      })
      return defaultStyleIndex
  },

  getTotalReviews: (reviews) => {
    let total = 0;
    for (let key in reviews) {
      total += Number(reviews[key]);
    }
    return total;
  },

  getTotalRatings: (reviews) => {
    let total = 0;
    for (let key in reviews) {
      total += Number(key) * Number(reviews[key]);
    }
    return total;
  },

  calculateAverageRating: (reviews) => {
    return averageReviewsCalculator.getTotalRatings(reviews) / averageReviewsCalculator.getTotalReviews(reviews) ;
  },

  roundAverageRating: (averageRating) => {
    let wholeNum, decimal;
    [wholeNum, decimal] = averageRating.toString().split('.')
    wholeNum = Number(wholeNum)
    if (!decimal) {
      return wholeNum
    }
    decimal = Number('.' + decimal)
    decimal = decimal >= 0 && decimal < .25 ? 0
      : decimal >= .25 && decimal < .5 ? .25
      : decimal >= .5 && decimal < .75 ? .50
      : .75
    return wholeNum + decimal
  },

  getAverageRating: (reviews) => {
    return averageReviewsCalculator.roundAverageRating(averageReviewsCalculator.calculateAverageRating(reviews))
  }
}

export default averageReviewsCalculator;
