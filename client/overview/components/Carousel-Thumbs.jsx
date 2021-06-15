import React from 'react';

const CarouselThumbs = ({ photos, clickImage }) => {

  let start = 0;
  let end = 4;

  let images = photos.map((photo, i) => photo.url)
  let showFour = images.slice(start, end);
  // let secondFour = images.slice(4, 8);
  // let rest = images.slice(8, 12);

  const arrowDown = () => {
    start++;
    end++;
    console.log('down clicked')
  }

  return (
    <div className="imageThumbs">
      <button onClick={() => {arrowUp()}}>/\</button>
      {showFour.map((image, i) =>
        <img key={i} src={image} height="100px" width="100px" onClick={() => {clickImage(image)}}/>
      )}

      {/* {secondFour.map((image, i) =>
        <img key={i} src={image} height="100px" width="100px" onClick={() => {clickImage(image)}}/>
      )}
      {rest.map((image, i) =>
        <img key={i} src={image} height="100px" width="100px" onClick={() => {clickImage(image)}}/>
      )} */}
      <button onClick={() => {arrowDown()}}>\/</button>
    </div>
  )
};
export default CarouselThumbs;