import React, { Component } from 'react';

import Map from '../map';

// need the div classname because the Map componenet needs to be nested in a div that has height stlying for nivo bubble to work
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
