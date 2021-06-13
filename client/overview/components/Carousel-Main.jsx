import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselExpanded from './Carousel-Expanded.jsx';

const Carousel = (props) => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[photos, setPhotos] = useState( [] );
  const[imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80");

  useEffect(() => {
    if (props.style.photos) {
      setPhotos(props.style.photos)
      setImageUrl(props.style.photos[0].thumbnail_url)
    }
  }, [props.style.photos])

  const clickImage = (url) => {
    // console.log("Selected Image: ", url)
    setImageUrl(url);
  }

  return (
    <>
    <div className="imageThumb">
      {photos.map((photo, i) =>
        // console.log('photo:', photo.thumbnail_url)
       <img key={i} src={photo.thumbnail_url} height="100px" width="80px" onClick={() => clickImage(photo.url)}/>
      )}
    </div>
    <div className="imageMain">
      <img src={imageUrl} height="600px" width="450px"/>
    </div>
    </>
  )
};

export default Carousel;