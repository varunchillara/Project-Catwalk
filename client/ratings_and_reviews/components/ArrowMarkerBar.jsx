import React from 'react';

function ArrowMarkerBar(props) {
  const renderValue = props.value.value || 0;
  const conversion = (renderValue/5) * 235;

  let style = {
    marginTop: '8px',
    width: '0',
    height: '0',
    borderLeft: '9px solid transparent',
    borderRight: '9px solid transparent',
    borderTop: '9px solid rgb(73, 73, 73)',
    position: 'absolute',
    transform: `translate(${conversion}px, 0px)`
  }

  return (
    <div className="arrowMarkerContainer">
      {/* {console.log('VALUE!!!! ********', conversion)} */}
      <div className="arrowMakerBar">
        <div className="bar1"/>
        <div className="bar1"/>
        <div className="bar1"/>
        <div className="arrow" style={style}/>
      </div>
    </div>
  )
}

export default ArrowMarkerBar;