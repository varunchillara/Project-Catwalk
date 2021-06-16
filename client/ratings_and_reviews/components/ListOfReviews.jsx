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
  const[currentSort, setCurrentSort] = useState('newest');
  const[toggleReport, setToggleReport] = useState(0);
  const[helpfulToggle, setHelpfulToggle] = useState(false);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // const reviewValues = Object.values(reviews)
  // let recs = 0;
  // reviewValues.forEach((item) => {
  //   if (item.recommend === true) {
  //     recs ++;
  //   }
  // })
  // console.log('**************', recs);

  function getReviews() {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
    params: {
      page: 1,
      count: currentCount,
      sort: currentSort,
      product_id: currentProduct.data.id || 11004
    }
  })
  .then((result) => {
    setReviews(result.data.results);
  })
  }

  function handleToggle() {
    setToggleReport(0);
  }

  function handleChange(e) {
    setCurrentSort(e.target.value);
 };

  useEffect(() => {
    getReviews();
  }, [currentProduct, currentCount, currentSort, toggleReport])

  return (
    <div className="Reviews">
      <header className="reviewsHeader">
        {reviews.length} reviews, sorted by<SortOptions handleChange={handleChange}/>
      </header>
      {reviews.map((review, i) => {
        return <Review key={i} review={review} getReviews={getReviews}/>
      })}
      <div className="buttons">
        <button className="button"
        onClick={() => {
          const newCount = currentCount + 2;
          setCurentCount(newCount);
        }}>MORE REVIEWS</button>
        <AddAReview id={currentProduct.id} />
      </div>
    </div>
  )
}

export default ListOfReviews;