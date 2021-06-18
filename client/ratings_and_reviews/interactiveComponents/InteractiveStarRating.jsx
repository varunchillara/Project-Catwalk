import React, {useState} from 'react';

const InteractiveStarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
//
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            id="starButton"
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              setRating(index);
              props.set(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="fa fa-star star"></span>
          </span>
        );
      })}
    </div>
  );
};

export default InteractiveStarRating;