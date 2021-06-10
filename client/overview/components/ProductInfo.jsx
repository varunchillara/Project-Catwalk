import React from 'react';

const ProductInfo = () => (
  <div className="styleSide">
    <div className="ratings">
      <h3>{"Ratings placeholder"}</h3>
    </div>
    <div className="productCategory">
      <h3>{"currentProduct.category"}</h3>
    </div>
    <div className="productName">
      <h3>{"currentProduct.name"}</h3>
    </div>
    <div className="productPriceDefault">
      <h3>{"currentProduct.default_price"}</h3>
    </div>
    <div className="productStyleHeader">
      <h3>{"Style < Selected Style-Placeholder"}</h3>
    </div>
    <div className="size-quantity">
      <div className="selectSize">
        <select>
          <option value="/">Select Size</option>
        </select>
      </div>
      <div className="selectQty">
        <select>
          <option value="/">1</option>
        </select>
      </div>
    </div>
    <div className="bag-outfit">
      <div className="addToBag">
        <p>{"Add To Bag placeholder"}</p>
      </div>
      <div className="addToOutfit">
        <p>{"Add To Outfit placeholder"}</p>
      </div>
    </div>
    <button className="share">Share</button>
  </div>
);

export default ProductInfo;
