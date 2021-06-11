import React from 'react';

const Features = ({ feature }) => (
  <ul>
    <li>{`${feature.value} ${feature.feature}`}</li>
  </ul>
);

export default Features;