import React from 'react';

function Bar(props) {

  let style = {
    background: 'rgb(73, 73, 73)',
    width: props.precent + '%',
    height: '7px',
    position: 'relative',
    transition: 'width .5s linear'
  }

  return (
    <div className="bar"><div className="status" style={style}/></div>
  )
}

export default Bar;