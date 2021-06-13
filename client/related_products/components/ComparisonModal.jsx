import React from 'react';
import ReactDOM from 'react-dom'
const ComparisonModal = (props) => {
  let modalOverlayInlineStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1000
  }
  let modalInlineStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000
  };
  let modalSpanInlineStyle = {visibility: 'visible'};
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
          <span className="close" style={modalSpanInlineStyle} onClick={props.closeCompareModal}>X</span>
          <p className="specs" style={modalSpecsInlineStyle}>
            <ComparisonTable currentProductName={props.currentProductData.nameWithText} relatedProductName={props.relatedProductData.nameWithText} comparisonData={generateCompareModalData(props.currentProductData.features, props.relatedProductData.features)}/>
          </p>
        </div>
      </div>
    </>, document.getElementById('portal')
  )
}

const ComparisonTable = (props) => {
  let currentProductHeaderInlineStyle = {
    background: 'gray',
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    textAlign: 'left'
  }
  let relatedProductHeaderInlineStyle = {
    background: 'gray',
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    textAlign: 'right'
  }
  let featureInlineStyle = {

  }
  let currentProductValueInlineStyle = {
    fontFamily: 'Cormorant'
  }
  let relatedProductValueInlineStyle = {
    fontFamily: 'Cormorant'
  }
  let featureTextInlineStyle = {
    fontFamily: 'Cormorant'
  }
  return (
    <table>
      <th className="current-product-header" style={currentProductHeaderInlineStyle} colspan="3">
        Current Product
      </th>
      <th className="related-product-header" style={relatedProductHeaderInlineStyle} colspan="3">
        Related Product
      </th>
      <hr></hr>
      <tr className="feature" style={featureInlineStyle}>
        <td className="current-product-value" colspan="2" style={currentProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
        <td className="feature-text" colspan="2">
          Feature 1
        </td>
        <td className="related-product-value" colspan="2" style={relatedProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
      </tr>
      <tr className="feature" colspan="2">
      <td className="current-product-value" colspan="2" style={currentProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
        <td className="feature-text" colspan="2">
          Feature 2
        </td>
        <td className="related-product-value" colspan="2" style={relatedProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
      </tr>
      <tr className="feature" colspan="2">
      <td className="current-product-value" colspan="2" style={currentProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
        <td className="feature-text" colspan="2">
          Feature 3
        </td>
        <td className="related-product-value" colspan="2" style={relatedProductValueInlineStyle}>
          Has or Doesn't Have
        </td>
      </tr>
    </table>
  )
}

export default ComparisonModal;