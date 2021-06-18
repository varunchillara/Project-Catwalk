import React from 'react';

function Bar(props) {

  let style = {
    background: 'rgb(158,181,168)',
    width: props.precent + '%',
    height: '7px',
    position: 'relative',
    transition: 'width .5s linear'
  }

  return (
    <div className="barContainer">
      <div className="bar"><div className="status" style={style}/></div>
      <div className="numOfReviews">({props.count})</div>
    </div>
  )
}

export default Bar;