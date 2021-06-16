import React from 'react';

const LogoSearch = () => (
  <div className="topOfPage">
    <div className="logo">
      <img src="./images/logo.jpg" height="120px" width="120px"/>
    </div>
    <div className="companyName">
      <h1>Garganelli Clothing</h1>
    </div>
    <input className="searchBar" type="search" alt="search"/>
    <button className="search-button" type="submit">
      <img src="./images/search.png" height="30px" width="30px"/>
    </button>
  </div>
);

export default LogoSearch;