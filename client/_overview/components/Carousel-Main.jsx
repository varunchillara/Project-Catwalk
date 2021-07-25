import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Image from 'react-image-enlarger';
import CarouselThumbs from './Carousel-Thumbs.jsx';

const Carousel = (props) => {
  const currentProduct = useSelector(state => state.currentProductData);
  const [photos, setPhotos] = useState( [] );
  const [imageUrl, setImageUrl] = useState( '' );
  const [zoomed, setZoomed] = useState( false );

  useEffect(() => {
    if (props.style.photos) {
      setPhotos(props.style.photos)
      setImageUrl(props.style.photos[0].url)
    }
  }, [props.style.photos])

  const clickImage = (url) => {
    setImageUrl(url);
  }

  return (
    <>
    <div className="imageThumbs">
      <CarouselThumbs photos={photos} clickImage={clickImage} />
      </div>
      <Image className="imageMain"
        style={{ "width": "auto", "minWidth": "950px", "height": "830px", "borderRadius": "6px" }}
        zoomed={zoomed}
        src={imageUrl}
        alt="main img"
        onClick={() => setZoomed(true)}
        onRequestClose={() => setZoomed(false)}
      />
    </>
  )
};

export default Carousel;