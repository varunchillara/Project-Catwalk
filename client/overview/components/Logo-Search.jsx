import React from 'react';

const LogoSearch = () => (
  <header className="topOfPage">
    <div className="logo">
      <img alt="logo" src="./images/logo.jpg" height="120px" width="120px"/>
    </div>
    <div className="companyName">
      <h1>Garganelli Clothing</h1>
    </div>
    <input className="searchBar" type="search" alt="search"/>
    <button className="search-button" type="submit">
      <img alt="search" src="./images/search.png" height="30px" width="30px"/>
    </button>
  </header>
);

export default LogoSearch;