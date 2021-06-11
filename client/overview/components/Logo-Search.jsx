import React from 'react';

const LogoSearch = () => (
  <div className="topOfPage">
    <div className="logo">
      <img src="https://images.unsplash.com/photo-1619684743280-af5941f82eb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" height="120px" width="120px"/>
    </div>
    <div className="companyName">
      <h1>Garganelli Clothing</h1>
    </div>
    <input className="searchBar" type="search" alt="search"/>
    <button className="search-button" type="submit">
      <img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png" height="30px" width="30px"/>
    </button>
  </div>
);

export default LogoSearch;