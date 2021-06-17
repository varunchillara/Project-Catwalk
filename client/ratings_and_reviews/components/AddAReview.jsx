import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import token from '../../env/config.js';
import customStyles from '../customStyles/customStyles.jsx';
import InteractiveStarRating from '../interactiveComponents/InteractiveStarRating.jsx';
import RadioSelection from '../interactiveComponents/RadioSelection.jsx';

function AddAReview(props){
  const [modalIsOpen,setIsOpen] = React.useState(false);

  useEffect(() => {
    Modal.setAppElement('#modal');
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function postReview(productId, rating, summary, body, recommend, name, email, characteristics) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: config.token
    };

    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
      product_id: productId,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: [],
      characteristics: characteristics
    });
  }

    return (
      <div id="modal">
        <button className="button" onClick={openModal}>ADD A REVIEW</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <button onClick={closeModal}>close</button> */}
          <form className="modalForm" style={customStyles.modalForm}>
            <div className="modalHeading">YOUR OVERALL RATING</div>
            <InteractiveStarRating />
            <hr className="breakLine"/>
            <div className="modalHeading">WOULD YOU RECOMMEND THIS PRODUCT?</div>
            <div>
              <label>
                <input type="radio" name="choice-radio" />
                Yes
              </label>
              <label>
                <input type="radio" name="choice-radio" />
                No
              </label>
            </div>
            <hr className="breakLine"/>

            <div className="FitLengthComfortQualityContainer">
              <div className="fitLengthContainer">
                <div>
                  <div className="modalHeading">FIT</div>
                  <RadioSelection />
                </div>
                <div className="lengthContainer">
                  <div className="modalHeading">LENGTH</div>
                  <RadioSelection />
                </div>
              </div>
              <div className="comfortAndQualityContainer">
                <div>
                  <div className="modalHeading">COMFORT</div>
                  <RadioSelection />
                </div>
                <div className="qualityContainer">
                  <div className="modalHeading">QUALITY</div>
                  <RadioSelection />
                </div>
              </div>
            </div>

            <hr className="breakLine"/>
            <div className="modalHeading">SUMMARY</div>
            <input type="text" id="fname" name="fname" />
            <div className="modalHeading">YOUR REVIEW</div>
            <textarea type="text" id="fname" name="fname" />
            <hr className="breakLine"/>
            <div className="modalHeading">NAME</div>
            <input type="text" id="fname" name="fname" />
            <div className="modalHeading">EMAIL</div>
            <input type="text" id="fname" name="fname" />

            <hr className="breakLine"/>
            <div className="formButtonContainer"><button className="formButton">SUBMIT</button></div>
          </form>
        </Modal>
      </div>
    );
}

export default AddAReview;