# Project Catwalk
Project Catwalk is a front-end e-commerce store front for online shoppers

## Table of Contents

1. **Product Overview:** View product with related images. Access or change style to see corresponding images and product name and product price. Includes add to cart and social media sharing features.

2. **Related Products:** Browse and compare products related to the product currently displayed in overview. Includes save feature allowing users to favorite their product for future purchase or viewing.

3. **Ratings And Reviews:** A page that allows users to see what other users reviews and ratings of the product they are currently viewing. Each user can add a review and contribute to the rating and reviews page.

## Tech/framework used

**Built With**
- Javascript
- Node.js
- Express
- React
- Redux
- SASS

## Product Overview


## Related Prodcuts


## Ratings And Reviews
The ratings and reviews widget allow users to view reviews before purchasing a product. The meta reviews on the left side allows to user to view averaged ratings past users have given and the right hand side allows users to see individual ratings. The widget also includes a write a review feature that allows the current user to write a review.

1. Product Breakdown and Review List
  ![](gifs_and_images/ratingsAndReviews.gif)
    * implemented a sorting system
    * translated data given to me by the black box API into visual data
    * dynamically rendered reviews from black box API

2. Add A Review
 ![](gifs_and_images/ratingsAndReviews_modal.png)
    * Allows current user to add a new review
    * Implemented a modal to contain the form information

## Build Project
Follow these steps to run the project in a mac or linux environment.
- Clone down the repo in the terminal
  * `git clone https://github.com/Garganelli/Project-Catwalk.git`
- Add personal github token
  * inside client/env copy exampleConfig.js file and rename to config.js
  * replace `UPDATE ME` with github key into config.js
- Install dependencies - `npm install`
- Run webpack - `npm run build`
- Run server -
  * live-server - `npm run start`
  OR
  * node server - `npm run server`


## Developers
- **Austin Miller** - Product Overview
- **Suliman Tekalli** - Related Products
- **Varun Chillara** - Ratings And Reviews