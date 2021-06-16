import React, {useState, useEffect} from 'react';

var begin = 0;
var end = 4;
const CarouselThumbs = ({ photos, clickImage }) => {
  const[urls, setUrls] = useState( [] );

  let showFour = urls.map(url => url);

  useEffect(() => {
    if (photos) {
      setUrls(photos.slice(begin, end));
    }
  }, [photos])

  const arrowDown = () => {
    if (begin === photos.length - 4) {
      begin = photos.length - 4;
      end = photos.length;
    } else {
      begin++;
      end++;
    }
    setUrls(photos.slice(begin, end));
  }

  const arrowUp = () => {
    if (begin === 0) {
      begin = 0
      end = 4;
    } else {
      begin--;
      end--;
    }
    setUrls(photos.slice(begin, end));
  }

  return (
    <div className="imageThumbs">
      <button style={{ "marginBottom": "20px" }} onClick={arrowUp}>/\</button>
      {showFour.map((image, i) =>
        <img key={i} style={{ "borderRadius": "10px", "height": "100px", "minWidth": "100px" }} src={image.thumbnail_url}  onClick={() => {clickImage(image.url)}}/>
      )}
      <button style={{ "marginTop": "-10px" }} onClick={arrowDown}>\/</button>
    </div>
  )
};
export default CarouselThumbs;