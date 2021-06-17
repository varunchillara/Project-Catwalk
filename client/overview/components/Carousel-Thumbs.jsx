import React, {useState, useEffect} from 'react';

var begin = 0;
var end = 7;
const CarouselThumbs = ({ photos, clickImage }) => {
  const[urls, setUrls] = useState( [] );

  let showSeven = urls.map(url => url);

  useEffect(() => {
    if (photos) {
      setUrls(photos.slice(begin, end));
    }
  }, [photos])

  const arrowDown = () => {
    if (photos.length < 7) {
      begin = 0;
      end = photos.length;
    } else {
      if (begin === photos.length - 7) {
        begin = photos.length - 7;
        end = photos.length;
      } else {
        begin++;
        end++;
      }
    }
    setUrls(photos.slice(begin, end));
  }

  const arrowUp = () => {
    if (begin === 0) {
      begin = 0;
      end = 7;
    } else {
      begin--;
      end--;
    }
    setUrls(photos.slice(begin, end));
  }

  return (
    <div className="imageThumbs">
      <button style={{ "marginTop": "10px", "marginBottom": "20px" }} onClick={arrowUp}>/\</button>
      {showSeven.map((image, i) =>
        <img key={i} style={{ "borderRadius": "10px", "height": "65px", "minWidth": "65px" }} src={image.thumbnail_url}  onClick={() => {clickImage(image.url)}}/>
      )}
      <button style={{ "marginTop": "-10px" }} onClick={arrowDown}>\/</button>
    </div>
  )
};
export default CarouselThumbs;