import React from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal';
// import styles from 'ratings_and_reviews/customStyles/customStyles.jsx'

const ComparisonModal = (props) => {

  let modalOverlayInlineStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: ' rgba(255, 255, 255, .7 )',
    zIndex: 1002
  }
  let modalInlineStyle = {
    position: 'fixed',
    borderRadius: '2%',
    border: '1px solid rgba(0, 0, 0, 0.27)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1002
  };
  let modalCloseInlineStyle = {
    marginTop: '5px',
    fontFamily: 'Cormorant',
    marginRight: '5px',
    fontSize: '18px',
    color: 'rgb( 73, 73, 73)',
    fontWeight: 'bolder',
    border: '1px solid rgb(73, 73, 73)',
    backgroundColor: 'white',
    padding: '7px 10px',
    textAlign: 'center',
    textAlign: 'right'
  };
  let modalSpecsInlineStyle = {visibility: 'visible'};

  if (props.comparisonId !== props.relatedProductData.id) {
    return (null)
  }

  //arrange the shared features data into a data structure that will mirror modal table

  const generateCompareModalData = (curProdFeatures, relProdFeatures) => {
    let modalData = {};
    for (let item in curProdFeatures) {
      modalData[item] = {currentProduct: curProdFeatures[item], relatedProduct: null}
    }
    for (let item in relProdFeatures) {
      modalData[item] ? modalData[item].relatedProduct = relProdFeatures[item]
        : modalData[item] = {currentProduct: null, relatedProduct: relProdFeatures[item]}
    }

    return modalData;
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" style={modalOverlayInlineStyle}>
        <div className="comparison-modal" style={modalInlineStyle}>
          <div className="close" style={modalCloseInlineStyle} onClick={props.closeCompareModal}>Close</div>
          <div className="specs" style={modalSpecsInlineStyle}>
            <ComparisonTable currentProductName={props.currentProductData.nameWithText} relatedProductName={props.relatedProductData.nameWithText} comparisonData={generateCompareModalData(props.currentProductData.features, props.relatedProductData.features)}/>
          </div>
        </div>
      </div>
    </>, document.getElementById('portal')
  )
}


const ComparisonTable = (props) => {
  let currentProductHeaderInlineStyle = {
    background: '#e6e6e6',
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    textAlign: 'left'
  }
  let relatedProductHeaderInlineStyle = {
    background: '#e6e6e6',
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    textAlign: 'right'
  }


  let comparisonData = props.comparisonData
  let comparisonKeys = Object.keys(comparisonData);

  return (
    <table width="500px">
      <thead>
        <tr>
          <td className="current-product-header" style={currentProductHeaderInlineStyle}>
            {props.currentProductName}
          </td>
          <td></td>
          <td className="related-product-header" style={relatedProductHeaderInlineStyle}>
            {props.relatedProductName}
          </td>
        </tr>
      </thead>
      <tbody>
        {comparisonKeys.map(feature =>
          <FeatureRow key={feature}
          feature={feature}
          currentProductValue={comparisonData[feature].currentProduct}
          relatedProductValue={comparisonData[feature].relatedProduct}
          />
        )}
      </tbody>
    </table>
  )
}

const FeatureRow = (props) => {
  let featureInlineStyle = {
    width: '500px'

  }
  let currentProductValueInlineStyle = {
    fontFamily: 'Cormorant',
    textAlign: 'left'
  }
  let relatedProductValueInlineStyle = {
    fontFamily: 'Cormorant',
    textAlign: 'right'
  }
  let featureTextInlineStyle = {
    fontFamily: 'Cormorant',
    textAlign: 'center',
    fontWeight: 'bolder'
  }


  return (
    <tr className="feature" style={featureInlineStyle}>
      <td className="current-product-value" style={currentProductValueInlineStyle}>
        {props.currentProductValue}
      </td>
      <td className="feature-text" style={featureTextInlineStyle}>
        {props.feature}
      </td>
      <td className="related-product-value" style={relatedProductValueInlineStyle}>
        {props.relatedProductValue}
      </td>
    </tr>
  )
}
export default ComparisonModal;