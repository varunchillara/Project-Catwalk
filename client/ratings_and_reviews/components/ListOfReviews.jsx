import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Review from './Review.jsx';
import SortOptions from './SortOptions.jsx';
import AddAReview from './AddAReview.jsx';

function ListOfReviews() {
  const currentProduct = useSelector(state => state.currentProduct) || { data: { id: 11004 } };
  const[reviews, setReviews] = useState([]);
  const[currentCount, setCurentCount] = useState(4);
  const[currentSort, setCurrentSort] = useState(undefined);
  const[toggleReport, setToggleReport] = useState(0);
  const[helpfulToggle, setHelpfulToggle] = useState(false);

  let customStyles = {
    scroll: {
    }
  }

  if (reviews.length > 3) {
    customStyles = {
      scroll: {
        height: "600px",
        overflow: "auto",
      }
    }
  }

  function getReviews() {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
    params: {
      page: 1,
      count: currentCount,
      sort: currentSort || 'newest',
      product_id: currentProduct.data.id || 11004
    }
  })
  .then((result) => {
    console.log('how many times does this run?');
    setReviews(result.data.results);
  })
  }

  function handleToggle() {
    setToggleReport(0);
  }

  function handleChange(e) {
    setCurrentSort(e.target.value);
 };

 useEffect(() => {getReviews();}, [toggleReport, currentSort, currentCount])

  return (
    <div className="Reviews">
      <header className="reviewsHeader">
        {reviews.length} reviews, sorted by<SortOptions handleChange={handleChange}/>
      </header>
      <div className="scroll" style={customStyles.scroll}>
        {reviews.map((review, i) => {
          return <Review key={i} review={review} getReviews={getReviews}/>
        })}
      </div>
      <div className="buttons">
        <button className="button"
        onClick={() => {
          const newCount = currentCount + 2;
          setCurentCount(newCount);
        }}>MORE REVIEWS</button>
        <AddAReview currentProduct={currentProduct} getReviews={getReviews}/>
      </div>
    </div>
  )
}

export default ListOfReviews;