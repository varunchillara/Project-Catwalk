import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import customStyles from '../customStyles/customStyles.jsx';
import InteractiveStarRating from '../interactiveComponents/InteractiveStarRating.jsx';
import RadioSelection from '../interactiveComponents/RadioSelection.jsx';
import RadioSelectionYesNo from '../interactiveComponents/RadioSelectionYesNo.jsx';
import axios from 'axios';
import token from '../../env/config.js';

function AddAReview(props){
  const [modalIsOpen,setIsOpen] = useState(false);

  const [currentRating, setRating] = useState(1);
  const [currentRecommend, setRecommend] = useState(false);

  const [currentSummary, setSummary] = useState('');
  const [currentBody, setBody] = useState('');
  const [currentName, setName] = useState('');
  const [currentEmail, setEmail] = useState('');

  const [currentFit, setFit] = useState(1);
  const [currentComfort, setComfort] = useState(1);
  const [currentLength, setLength] = useState(1);
  const [currentQuality, setQuality] = useState(1);

  useEffect(() => {
    Modal.setAppElement('#modal');
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function postReview() {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };

    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews', {
      product_id: props.currentProduct.data.id,
      rating: currentRating,
      summary: currentSummary,
      body: currentBody,
      recommend: currentRecommend,
      name: currentName,
      email: currentEmail,
      photos: [],
      characteristics: {}
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postReview();
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
          <form className="modalForm" style={customStyles.modalForm} onSubmit={handleSubmit}>
            <div className="modalHeading">YOUR OVERALL RATING</div>
            <InteractiveStarRating set={setRating}/>
            <hr className="breakLine"/>
            <div className="modalHeading">WOULD YOU RECOMMEND THIS PRODUCT?</div>
            <div>
              <RadioSelectionYesNo set={setRecommend}/>
            </div>
            <hr className="breakLine"/>
            <div className="FitLengthComfortQualityContainer">
              <div className="fitLengthContainer">
                <div>
                  <div className="modalHeading">FIT</div>
                  <RadioSelection set={setFit}/>
                </div>
                <div className="lengthContainer">
                  <div className="modalHeading">LENGTH</div>
                  <RadioSelection set={setComfort}/>
                </div>
              </div>
              <div className="comfortAndQualityContainer">
                <div>
                  <div className="modalHeading">COMFORT</div>
                  <RadioSelection set={setLength}/>
                </div>
                <div className="qualityContainer">
                  <div className="modalHeading">QUALITY</div>
                  <RadioSelection set={setQuality}/>
                </div>
              </div>
            </div>
            <hr className="breakLine"/>
            <div className="modalHeading">SUMMARY</div>
            <input type="text" id="fname" name="fname" onChange={(e) => {setSummary(e.target.value)}}/>
            <div className="modalHeading">YOUR REVIEW</div>
            <textarea type="text" id="fname" name="fname" onChange={(e) => {setBody(e.target.value)}}/>
            <hr className="breakLine"/>
            <div className="modalHeading">NAME</div>
            <input type="text" id="fname" name="fname" onChange={(e) => {setName(e.target.value)}}/>
            <div className="modalHeading">EMAIL</div>
            <input type="email" id="fname" name="fname" onChange={(e) => {setEmail(e.target.value)}}/>
            <hr className="breakLine"/>
            <div className="formButtonContainer"><button className="formButton">SUBMIT</button></div>
          </form>
        </Modal>
      </div>
    );
}

export default AddAReview;