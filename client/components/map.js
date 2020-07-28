import React, { Component, useState, useEffect } from 'react';
import Bubble from './Bubble';

function Map() {
  const [data, setData] = useState({
    name: 'React',
    loc: 10000,
    children: []
  });

  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((data) => {
        console.log('PAGE RENDER: ', data);
        //let chilrenArray = [...this.state]
        const newArray = [];
        for (let i = 0; i < data.length; i++) {
          data[i].loc = 2000;

          if (data[i].type === 'state-management') {
            data[i].color = 'hsl(228, 70%, 50%)';
          } else if (data[i].type === 'ui-components') {
            data[i].color = 'hsl(24, 70%, 50%)';
          } else if (data[i].type === 'router') {
            data[i].color = 'hsl(156, 70%, 50%)';
          }
          newArray.push(data[i]);
        }
        //console.log('NEW ARRAY: ', newArray);
        setData({
          name: 'React',
          loc: 10000,
          children: newArray
        });
      })
      .catch((err) => console.log('Map.componentDidMount: ERROR: ', err));
  });

  return (
    <div className="bubbleContainer">
      <Bubble data={data} />
    </div>
  );
}

export default Map;
