import React, {useState, useEffect} from 'react';
import {Link} from 'react-scroll';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Stars from '../../sharedComponents/Stars.jsx';
import PopupBag from './PopupBag.jsx';
import PopupOutfit from './PopupOutfit.jsx';
import PopupShare from './PopupShare.jsx';
import customStyles from '../../ratings_and_reviews/customStyles/customStyles.jsx';

const ProductInfo = (props) => {
  const currentProduct = useSelector(state => state.currentProduct) || { data: {style: {category: null, name: null}} };
  const currentRating = useSelector(state => state.currentRating);
  const[productStyle, setProductStyle] = useState( );
  const[productPrice, setProductPrice] = useState( );
  const[productSkus, setProductSkus] = useState( {} );
  const[currentSize, setCurrentSize] = useState( '' );
  const[quantity, setQuantity] = useState( [] );
  const[isOpenBag, setIsOpenBag] = useState(false);
  const[isOpenShare, setIsOpenShare] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);

  useEffect(() => {
    if (props.style.name) {
      setProductStyle(props.style.name);
    }
  }, [props.style.name])

  useEffect(() => {
    if (props.style.sale_price) {
      setProductPrice(props.style.sale_price);
    } else {
      setProductPrice(0);
    }
  }, [props.style.sale_price])

  useEffect(() => {
    if (props.style.skus) {
      setProductSkus(props.style.skus);
      let defaultQty = new Array(15).fill(true).map((num, i) => i + 1)
      setQuantity(defaultQty)
    }
  }, [props.style.skus])

  useEffect(() => {
    Modal.setAppElement('#modal');
  }, [])

  const selectSize = (e) => {
    setCurrentSize(e.target.value);
    console.log(e.target.value)
    // selectQuantity();
  }

  const selectQuantity = () => {
    if (currentSize === 'L') {
      console.log('This is the currentSize', currentSize)
    }
    let skus = Object.values(productSkus);
    for (let i = 0; i < skus.length; i++) {
      if (skus[i].size === currentSize) {
        var qty;
        if (skus[i].quantity === 0) {
          qty = ['Out of Stock'];
        }
        if (skus[i].quantity < 15) {
          qty = new Array(skus[i].quantity).fill(true).map((num, i) => i + 1);
        } else {
          qty = new Array(15).fill(true).map((num, i) => i + 1);
        }
      }
    }
    setQuantity(qty);
  }

  const clickImage = (photo) => {
    props.setStyle(photo);
  }

  const priceCheck = () => {
    if (productPrice > 0) {
      return (
        <>
        <span
          style={{ 'color': 'grey', 'textDecoration': 'line-through', 'textDecorationThickness': '2px', 'fontSize': '20px' }}>
          ${props.style.original_price}
        </span>
        <span
          style={{ 'color': 'red', 'paddingLeft': '10px', 'fontSize': '24px', 'fontStyle': 'italic' }}>
          ${productPrice}
        </span>
        </>
      )
    }
    return <span style={{ 'fontSize': '20px' }}>${props.style.original_price}</span>;
  }

  const togglePopupBag = () => {
    setIsOpenBag(!isOpenBag);
  }

  const togglePopupShare = () => {
    setIsOpenShare(!isOpenShare);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="styleSide">
      <div className="ratings">
        <Stars rating={currentRating} />
        <Link to="modal" spy={true} smooth={true}>Read all reviews</Link>
      </div>
      <div className="productCategory">
        <h3>{currentProduct.data.category}</h3>
      </div>
      <div className="productName">
        <h3>{currentProduct.data.name}</h3>
      </div>
      <div className="productPriceDefault">
        {priceCheck()}
      </div>
      <div className="productStyleHeader">
        <span>Selected Style: </span>
        <span style={{ 'color': 'rgb(59, 158, 189)', 'fontWeight': 'bold' }}> {productStyle}</span>
      </div>
      <div className="styleThumbsMain">
        {props.productStyles.map((style, i) =>
        <div className="styleThumbs" key={i}>
          <img alt="styleThumb" style={{"border" : "2px solid #555", "borderRadius": "50%" }} src={style.photos[0].thumbnail_url} height="100px" width="100px" onClick={() => clickImage(style)}/>
        </div>
        )}
      </div>
      <div className="size-quantity">
        <select
          className="selectSize" onChange={selectSize}>
            <option key={0}>-</option>
          {Object.values(productSkus).map((sku, i) =>
            <option key={i}>{sku.size}</option>
          )}
        </select>
        <select className="selectQty">
          <option key={0}>-</option>
          {quantity.map((qty, i) =>
            <option key={i}>{qty}</option>
          )}
        </select>
      </div>
      <div className="bag-outfit">
        <div className="addToBag">
          <input
            type="button"
            className="button"
            value="Add to Bag"
            onClick={togglePopupBag}
          />
          {isOpenBag && <PopupBag
            bagContent={<>
              <span style={{ "fontSize": "20px", "fontWeight": "bold"}}>Added to Bag!</span>
              <span style={{ "fontSize": "20px", "marginLeft": "8px", "fontWeight": "bold"}}>You're one step closer to happiness!</span>
            </>}
            handleCloseBag={togglePopupBag}
          />}
        </div>
        <div className="addToOutfit">
          <img
            style={{ "border": "1px solid #555", "marginTop": "14px" }} src="./assets/relatedProductACTION.png" height="46px" width="46px"
            onClick={props.togglePopupOutfit}
          />
          {props.isOpenOutfit &&
          <PopupOutfit handleCloseOutfit={props.togglePopupOutfit}>
            <span style={{ "fontSize": "20px", "fontWeight": "bold"}}>Added to Outfit!</span>
            <span style={{ "fontSize": "20px", "marginLeft": "8px", "fontWeight": "bold"}}>You're looking good!</span>
          </PopupOutfit>}
        </div>
      </div>
      <div className="share">
        <img alt="twitter" onClick={openModal} style={{"marginTop": "20px", "marginRight": "10px"}} src="./assets/twitter.png" height="50px" width="50px"/>
        <img alt="pinterest" onClick={openModal} style={{"marginRight": "10px"}} src="./assets/pinterest.png" height="50px" width="50px"/>
        <img alt="facebook" onClick={openModal} src="./assets/facebook.png" height="50px" width="50px"/>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>close</button>
          <form className="modalForm" style={customStyles.modalForm}>
            <div className="block">
              <label className="label">message:</label>
              <input type="text" required value="http://www.garganelliclothing.com/products"/>
            </div>
            <input className="button" type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    </div>
  )
};

export default ProductInfo;