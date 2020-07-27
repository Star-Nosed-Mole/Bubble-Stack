import React, { Component } from 'react';
import Bubble from './Bubble';
import { findConfigFile } from 'typescript';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      color: 'hsl(191, 70%, 50%)',
      loc: 0,
      children: []
    };

    this.getData = this.getData.bind(this);
    this.hideBtn = this.hideBtn.bind(this);
  }

  componentDidMount() {
    this.hideBtn();
  }

  hideBtn() {
    let d = document.getElementById('stack-btn');
    d.style.display = 'none';
  }

  getData(tech) {
    fetch('api/getLibrary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ library: tech })
    })
      .then((res) => res.json())
      .then((data) => {
        // create innerBubble objec to push to children array
        let innerBubble = {};
        // let name = data.name;
        console.log('DATA OBJ: ', data.type, data.name);
        // create shallow copy of state's children array to manipulate
        let childrenArray = [...this.state.children];
        // check if childrenArray is empty
        if (childrenArray.length === 0) {
          innerBubble.name = data.name;
          innerBubble.loc = 5000;
          console.log('IN LENGTH 0 check');
          if (data.type === 'state-management') {
            innerBubble.color = 'hsl(228, 96%, 51%)';
          } else if (data.type === 'ui-components') {
            innerBubble.color = 'hsl(24, 96%, 67%)';
          } else if (data.type === 'router') {
            innerBubble.color = 'hsl(156, 41%, 54%)';
          }
        }
        let nameExists = false;
        for (let i = 0; i < childrenArray.length; i++) {
          // if a bubble object doesn't exist with name property
          if (childrenArray[i].name === data.name) {
            // do something
            nameExists = true;
            childrenArray.splice(i, 1);
            console.log('CHIDLREN ARRAY: ', childrenArray);
            this.setState({
              ...this.state,
              children: childrenArray
            });
          }
        }

        if (nameExists === false) {
          console.log('TEST');
          innerBubble.name = data.name;
          innerBubble.loc = 6000;
          if (data.type === 'state-management') {
            innerBubble.color = 'hsl(228, 96%, 51%)';
          } else if (data.type === 'ui-components') {
            innerBubble.color = 'hsl(24, 96%, 67%)';
          } else if (data.type === 'router') {
            innerBubble.color = 'hsl(156, 41%, 54%)';
          }
        }

        // take location and name add to an object and push copy of state.children array
        // if data.type === 'state management' set color to blue
        childrenArray.push(innerBubble);
        this.setState({
          ...this.state,
          children: childrenArray
        });

        console.log('STATE: ', this.state);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="left-sidebar">
          <details>
            <summary>State Management</summary>
            <ul className="collapsible-content">
              <button onClick={() => this.getData('redux')}>Redux</button>
              <button onClick={() => this.getData('recoil')}>Recoil</button>
              <button onClick={() => this.getData('mobx')}>MobX</button>
            </ul>
          </details>

          <details>
            <summary>UI Components</summary>
            <ul className="collapsible-content">
              <button onClick={() => this.getData('materialui')}>
                Material UI
              </button>
              <button onClick={() => this.getData('bootstrap')}>
                React Bootstrap
              </button>
              <button onClick={() => this.getData('rebass')}>Rebass</button>
            </ul>
          </details>
        </div>

        <div className="bubbleContainer">
          <Bubble data={this.state} />
        </div>
      </div>
    );
  }
}

export default MakeMap;
