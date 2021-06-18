import React from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal';

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
  let modalSpecsInlineStyle = {visibility: 'visible'};

  if (props.comparisonId !== props.relatedProductData.id) {
    return (null)
  }

  //arrange the shared features data into a data structure that will mirror modal table

  const generateCompareModalData = (curProdFeatures, relProdFeatures) => {
    let modalData = {};
    for (let item in curProdFeatures) {
      modalData[item] = {currentProduct: ' ✓ ' + curProdFeatures[item], relatedProduct: null}
    }

    // for (let item in relProdFeatures) {
    //   if (modalData[item]) {
    //     modalData[item].relatedProduct = relProdFeatures[item]
    //   } else {
    //     modalData[item] = {currentProduct: null, relatedProduct: relProdFeatures[item] + ' ✓ '}
    //   }
    // }

    for (let item in relProdFeatures) {
      if (modalData[item]) {
        if (relProdFeatures[item] === null) {
          modalData[item].relatedProduct = relProdFeatures[item]
        } else {
          modalData[item].relatedProduct = relProdFeatures[item] +  ' ✓ '
        }
      } else {
        if (relProdFeatures[item] === null) {
          modalData[item] = {
            currentProduct: null,
            relatedProduct: relProdFeatures[item]
          }
        } else {
          modalData[item] = {
            currentProduct: null,
            relatedProduct: relProdFeatures[item] +  ' ✓ '
          }
        }
      }
    }
    return modalData;
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" style={modalOverlayInlineStyle}>
        <div className="comparison-modal" style={modalInlineStyle}>
          <div className="specs" style={modalSpecsInlineStyle}>
            <ComparisonTable currentProductName={props.currentProductData.nameWithText} relatedProductName={props.relatedProductData.nameWithText} comparisonData={generateCompareModalData(props.currentProductData.features, props.relatedProductData.features)} closeCompareModal={props.closeCompareModal}/>
          </div>
        </div>
      </div>
    </>, document.getElementById('portal')
  )
}


const ComparisonTable = (props) => {
  let currentProductHeaderInlineStyle = {
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    fontSize: '20px',
    textAlign: 'left'
  }
  let relatedProductHeaderInlineStyle = {
    fontFamily: 'Cormorant',
    fontWeight: 'bolder',
    fontSize: '20px',
    textAlign: 'right'
  }

  let modalCloseInlineStyle = {
    fontFamily: 'Cormorant',
    fontSize: '18px',
    color: 'rgb( 73, 73, 73)',
    fontWeight: 'bolder',
    border: '1px solid rgb(73, 73, 73)',
    backgroundColor: 'white',
    padding: '7px 10px',
    alignSelf: 'center'
  };
  let modalCloseContainerInlineStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    cursor: 'pointer'
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
        <tr>
          <td></td>
          <td>
            <div className="close-container" style={modalCloseContainerInlineStyle}>
              <div className="close" style={modalCloseInlineStyle} onClick={props.closeCompareModal}>Close</div>
            </div>
          </td>
          <td></td>
        </tr>
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