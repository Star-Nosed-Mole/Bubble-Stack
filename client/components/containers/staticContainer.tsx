import React, { Component } from 'react';

import Map from '../map';

// import MainContainer from './containers/MainContainer';
class StaticContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Map />
      </div>
    );
  }
}

export default StaticContainer;
