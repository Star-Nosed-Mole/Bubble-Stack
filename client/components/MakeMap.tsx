import React, { Component } from 'react';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (        
        <div className="container">
          <div className="left-sidebar">

          <details>
          <summary>
            State Management</summary>
            <div className="collapsible-content">
              <li>Redux</li>
              <li>Recoil</li>
              <li>MobX</li>
            </div>
            </details>
            
            <details>
            <summary>
              UI Components</summary>
            <div className="collapsible-content">
              <li>Material UI</li>
              <li>React Bootstrap</li>
              <li>Rebass</li>
            </div>
            </details>
          </div>
        </div>
      );
  }
}
export default MakeMap;