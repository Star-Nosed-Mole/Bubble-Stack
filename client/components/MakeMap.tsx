import React, { Component } from 'react';
import Bubble from './Bubble';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bubbleContainer">
        <Bubble />
      </div>
    );
  }
}
export default MakeMap;
