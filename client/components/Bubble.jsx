import React, { Component } from 'react';
import { ResponsiveBubbleHtml } from "@nivo/circle-packing";
import data from './data.ts';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const Bubble = () => {
    return ( <ResponsiveBubbleHtml
    root={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    identity="name"
    value="loc"
    colors={{ scheme: "paired" }}
    labelSkipRadius={10}
    labelTextColor={{ from: "color", modifiers: [["darker", 0.8]] }}
    borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
    animate={true}
    motionStiffness={90}
    motionDamping={12}
  />);
};

export default Bubble;