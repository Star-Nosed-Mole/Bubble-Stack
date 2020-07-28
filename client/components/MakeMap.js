import React, { Component } from 'react';
import Bubble from './Bubble';
import { findConfigFile } from 'typescript';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
    // bubble chart initial state.
    this.state = {
      name: 'React',
      color: 'hsl(191, 70%, 50%)',
      loc: 10000,
      children: [],
      show: false
    };

    this.getData = this.getData.bind(this);
    this.hideBtn = this.hideBtn.bind(this);
  }

  // showModal = () => {
  //   this.setState({ show: true });
  // };

  // hideModal = () => {
  //   this.setState({ show: false });
  // };

  componentDidMount() {
    this.hideBtn();
  }

  hideBtn() {
    let d = document.getElementById('stack-btn');
    d.style.display = 'none';
  }
  // post request passing string of text from onClick in navbar to backend for query
  getData(tech) {
    fetch('/api/getLibrary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ library: tech })
    })
      .then((res) => res.json())
      .then((data) => {
        // create bubble object to add to bubble charts children array for rendering
        let innerBubble = {};
        // assign aliases for name and loc from
        let name = data.name;
        let loc = data.loc;
        // create shallow copy of state's children array to manipulate
        let childrenArray = [...this.state.children];
        // boolean flag to check if the tech alreay exists in the children array
        let nameExists = false;
        for (let i = 0; i < childrenArray.length; i++) {
          // if a bubble object already exists with name property (because the user has already clicked on that tech)
          if (childrenArray[i].name === data.name) {
            nameExists = true;
            // remove that element from the array
            childrenArray.splice(i, 1);
          }
        }
        // if know tech is found after iterating through children array we will build out the innerBubble object
        if (nameExists === false) {
          // add properties and/or values to bubble objects
          innerBubble.name = name;
          innerBubble.description = 'DESCRIPTION';
          innerBubble.loc = loc;
          if (data.type === 'state-management') {
            innerBubble.color = 'hsl(228, 70%, 50%)';
          } else if (data.type === 'ui-components') {
            innerBubble.color = 'hsl(24, 70%, 50%)';
          } else if (data.type === 'router') {
            innerBubble.color = 'hsl(156, 70%, 50%)';
          }
          // push innerBubble object to childrenArray
          childrenArray.push(innerBubble);
        }
        // update state with childrenArray.
        this.setState({
          ...this.state,
          children: childrenArray
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="left-sidebar">
          <details>
            <summary>State Management</summary>
            <ul className="collapsible-content">
              {/* fire getData method onClick and pass in the tech they clicked on in the navbar */}
              <button onClick={() => this.getData('redux')}>Redux</button>
              <button onClick={() => this.getData('recoil')}>Recoil</button>
              <button onClick={() => this.getData('mobx')}>MobX</button>
            </ul>
          </details>

          <details>
            <summary>UI Components</summary>
            <ul className="collapsible-content">
              <button onClick={() => this.getData('material-ui')}>
                Material UI
              </button>
              <button onClick={() => this.getData('react-bootstrap')}>
                React Bootstrap
              </button>
              <button onClick={() => this.getData('rebass')}>Rebass</button>
            </ul>
          </details>
        </div>

        <div className="bubbleContainer">
          {/* pass state down to bubble chart */}
          <Bubble data={this.state} />
        </div>
      </div>
    );
  }
}

export default MakeMap;
