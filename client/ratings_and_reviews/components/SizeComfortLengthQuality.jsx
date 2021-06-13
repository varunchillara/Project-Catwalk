import React from 'react';
import Size from './Size.jsx';
import Comfort from './Comfort.jsx';
import Length from './Length.jsx';
import Quality from './Quality.jsx';

function SizeComfortLengthQuality(props) {
  const characteristics = props.characteristics || {};
  const fit = characteristics.Fit || {};
  const comfort = characteristics.Comfort || {};
  const length = characteristics.Length || {};
  const quality = characteristics.Quality || {};

  return (
    <div className="comfortFitLengthQuality">
      {/* {console.log('******** charactersitics!!', characteristics)} */}
      <Size fit={fit} />
      <Comfort comfort={comfort} />
      <Length length={length} />
      <Quality quality={quality} />
    </div>
  )
}

export default SizeComfortLengthQuality;