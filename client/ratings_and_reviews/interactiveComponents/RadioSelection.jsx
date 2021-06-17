import React from 'react';

const RadioSelection = () => {
  return (
    <div id="debt-amount-slider">
      <input type="radio" name="debt-amount" id="1" value="1" required/>
      <label data-debt-amount="< $10k"></label>
      <input type="radio" name="debt-amount" id="2" value="2" required/>
      <label data-debt-amount="$10k-25k"></label>
      <input type="radio" name="debt-amount" id="3" value="3" required/>
      <label data-debt-amount="$25k-50k"></label>
      <input type="radio" name="debt-amount" id="4" value="4" required/>
      <label data-debt-amount="$50k-100k"></label>
      <input type="radio" name="debt-amount" id="5" value="5" required/>
      <label data-debt-amount="$100k+"></label>
      <div id="debt-amount-pos"></div>
    </div>
  );
};

export default RadioSelection;