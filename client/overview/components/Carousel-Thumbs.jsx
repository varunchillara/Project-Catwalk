import React, {useState, useEffect} from 'react';

const CarouselThumbs = ({ photos, clickImage }) => {
  const[urls, setUrls] = useState( [] );

  var start = 0;
  var end = 4;
  let showFour = urls.map(url => url.thumbnail_url);

  useEffect(() => {
    if (photos) {
      setUrls(photos.slice(start, end));
    }
  }, [photos])

  const arrowDown = () => {
    if (start === urls.length - 4) {
      start = urls.length - 4;
      end = urls.length;
    } else {
      start++;
      end++;
    }

    setUrls(photos.slice(start + 1, end + 1));
    // console.log('start click', start)
  }

  // console.log('start', start);
  // console.log('end', end);

  const arrowUp = () => {
    if (start === 0) {
      start = 0
      end = 4;
    } else {
      start--;
      end--;
    }
    setUrls(photos.slice(start, end));
  }

  // console.log('urls', urls)

  return (
    <div className="imageThumbs">
      <button style={{ 'marginBottom': '20px' }} onClick={() => {arrowUp()}}>/\</button>
      {showFour.map((image, i) =>
        <img key={i} style={{ "borderRadius": "10px" }} src={image} height="100px" width="100px" onClick={() => {clickImage(image)}}/>
      )}
      <button style={{ "marginTop": "-10px" }} onClick={() => {arrowDown()}}>\/</button>
    </div>
  )
};
export default CarouselThumbs;