import React, {useEffect} from 'react';
import Stars from '../../sharedComponents/Stars.jsx';
import helperFunctions from '../../helperFunctions.js';
import {useDispatch} from 'react-redux';
import {updateRating} from '../../../store/actions/updateRating.js';

function Rating (props) {
  let currentRating = helperFunctions.getAverageRating(props.ratings);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateRating(currentRating));
  }, [currentRating])


  return (
    <div className="rating">
      {/* {console.log('****************!!!!', currentRating)} */}
      <div className="overallRating">{JSON.stringify(currentRating)}</div>
      <div className="starsContainer"><Stars rating={currentRating} /></div>
    </div>
  )
}

export default Rating