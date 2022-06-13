import React from 'react';

const MarketStatistic: React.FC<any> = (props) => {
  const {} = props;
  return (
    <iframe
      frameBorder={0}
      style={{ width: '100%', height: 830, overflow: 'visible' }}
      src="https://robo.datayes.com/v2/landing/marketgrp"
    />
  );
};

export default MarketStatistic;
