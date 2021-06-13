import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import CarouselExpanded from './Carousel-Expanded.jsx';

const Carousel = () => {
  const currentProduct = useSelector(state => state.currentProduct);
  const[photos, setPhotos] = useState( [] );
  const[imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80");
  const[productStyle, setProductStyle] = useState( [] );

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/11001/styles`, {
      params: {
        product_id: currentProduct.id,
        results: currentProduct.results
      }
    })
    .then((result) => {
      setPhotos(result.data.results[0].photos);
      setProductStyle(result.data.results);
    })
  }, [currentProduct])

  const clickImage = (url) => {
    // console.log("Image: ", url)
    setImageUrl(url);
  }

  return (
    <>
    <div className="imageThumb">
      {photos.map((photo, i) =>
        // console.log("photo:", photo.thumbnail_url)
        <img key={i} src={photo.thumbnail_url} height="100px" width="80px" onClick={() => clickImage(photo.url)}/>
      )}
    </div>
    <div className="imageMain">
      <img src={imageUrl} height="600px" width="450px"/>
      {/* <CarouselExpanded image={imageUrl} /> */}
    </div>
    </>
  )
};

export default Carousel;