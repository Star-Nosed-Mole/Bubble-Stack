import React, { Component } from 'react';
import Bubble from './Bubble.jsx';


// import MainContainer from './containers/MainContainer';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div className="container">
          <Bubble />
        </div>
      );
  }
}
export default App;