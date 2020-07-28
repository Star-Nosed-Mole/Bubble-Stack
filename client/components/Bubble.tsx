import React, { Component } from 'react';
import { ResponsiveBubbleHtml } from '@nivo/circle-packing';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// check nivo bubble chart documentation to see the boilerplate and properties

const Bubble = (props) => {
  // opens reactjs website. planned to open each techs respective website onClick of bubble
  const openTech = () => {
    const url = 'https://reactjs.org/';
    window.open(url, '_blank');
  };
  return (
    <ResponsiveBubbleHtml
      root={props.data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      identity="name"
      value="loc"
      label={function (e) {
        console.log(e.description);
        return e.id + ': ' + e.value;
      }}
      colors={{ scheme: 'paired' }}
      colorBy="color"
      labelSkipRadius={100}
      labelTextColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
      borderColor="#000000"
      //borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={30}
      onClick={openTech}
    />
  );
};

export default Bubble;
