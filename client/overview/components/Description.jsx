import React from 'react';

const Description = () => (
  <div className="description">
    <div className="productSlogan">
      <p>{"currentProduct.slogan"}</p>
    </div>
    <div className="productDescription">
      <p>{"currentProduct.description"}</p>
    </div>
  </div>
);

export default Description;