import React, {useState, useEffect} from 'react';
import Overview from './overview/Overview.jsx';
import RatingsAndReviews from './ratings_and_reviews/RatingsAndReviews.jsx';
import axios from 'axios';
import token from './env/config.js';

function App () {
  // const [currentAppId, setCurrentAppId] = useState(11004);
  // const [currentChosenStyle, setCurrentChosenStyle] = useState(51174);

  return(
    <div className="App">
      <Overview />
      <RatingsAndReviews />
    </div>
  );
}

export default App;