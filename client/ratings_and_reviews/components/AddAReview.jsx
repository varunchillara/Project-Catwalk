import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import token from '../../env/config.js';
import customStyles from '../customStyles/customStyles.jsx';

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

  function postReview(productId, rating, summary, body, recommend, name, email, photos, characteristics) {
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
      photos: photos,
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

          <button onClick={closeModal}>close</button>

          <form className="modalForm" style={customStyles.modalForm}>
            <label>rating:<input type="text" /></label>
            <label>summary:<input type="text" /></label>
            <label>body:<input type="text" /></label>
            <label>recommend:<input type="text" /></label>
            <label>name:<input type="text" /></label>
            <label>email:<input type="text" /></label>
            <label>photos:<input type="text" /></label>

            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
}

export default AddAReview;