import React from 'react';
import Bar from './Bar.jsx';

function StarsCount (props) {
  const totalRatings = props.ratings || {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  const totalRatingsValues = Object.values(totalRatings).length === 0 ? [0] : Object.values(totalRatings);

  const reducer = (accumulator, currentValue) => {return (Number(accumulator) + Number(currentValue))};
  const totalRatingsAdded = totalRatingsValues.reduce(reducer);

  const fiveStar = totalRatings['5'] || 0;
  const fourStar = totalRatings['4'] || 0;
  const threeStar = totalRatings['3'] || 0;
  const twoStar = totalRatings['2'] || 0;
  const oneStar = totalRatings['1'] || 0;

  return (
  <div className="starsCountContainer">
    {console.log('toal ratings!!!!', totalRatingsAdded)}
    <div className="starsCount">
      <div className="stars1">5 stars</div>
      <Bar precent={((Number(fiveStar)) / totalRatingsAdded) * 100} />
    </div>
    <div className="starsCount">
      <div className="stars1">4 stars</div>
      <Bar precent={((Number(fourStar)) / totalRatingsAdded) * 100} />
    </div>
    <div className="starsCount">
      <div className="stars1">3 stars</div>
      <Bar precent={((Number(threeStar)) / totalRatingsAdded) * 100} />
    </div>
    <div className="starsCount">
      <div className="stars1">2 stars</div>
      <Bar precent={((Number(twoStar)) / totalRatingsAdded) * 100} />
    </div>
    <div className="starsCount">
      <div className="stars1">1 stars</div>
      <Bar precent={((Number(oneStar)) / totalRatingsAdded) * 100} />
    </div>
  </div>
  );
}

export default StarsCount;