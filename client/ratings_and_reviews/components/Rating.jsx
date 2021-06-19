import React, {useEffect} from 'react';
import Stars from '../../sharedComponents/Stars.jsx';
import helperFunctions from '../../helperFunctions/averageReviewsCalculator.js';
import {useDispatch} from 'react-redux';
import {updateRating} from '../../../store/actions/updateRating.js';
import Stars2 from '../../Stars2.jsx';



function Rating (props) {
  let currentRating = helperFunctions.getAverageRating(props.ratings);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateRating(currentRating));
  }, [currentRating])


  return (
    <div className="rating">
      <div className="overallRating">{JSON.stringify(currentRating)}</div>
      <div className="starsContainer"><Stars2 width={"17px"} rating={currentRating} /></div>
    </div>
  )
}

export default Rating