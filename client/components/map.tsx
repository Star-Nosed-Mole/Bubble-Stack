import React, { Component, useState } from 'react';
import Bubble from './Bubble';

function Map() {
  const [data, setData] = useState({
    data: {
      name: 'Bubble-Stack',
      children: [
        {
          name: 'React',
          color: 'hsl(191, 70%, 50%)',
          loc: 13285
        }
      ]
    }
  });

  return (
    <div className="bubbleContainer">
      <Bubble data={data} />
    </div>
  );
}

export default Map;
