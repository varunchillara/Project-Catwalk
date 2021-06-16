import React from 'react';

const Features = ({ feature }) => (
  <>
  <div className="vertical"></div>
  <ul>
    <li>{`${feature.value} ${feature.feature}`}</li>
  </ul>
  </>
);

export default Features;