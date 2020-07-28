import React, { Component } from 'react';
import Bubble from './Bubble';
import { findConfigFile } from 'typescript';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      color: 'hsl(191, 80%, 50%)',
      loc: 13285,
      children: [
      ]
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
        console.log(data);
        // create innerBubble objec to push to children array
        let innerBubble = {};
        // let name = data.name;
        console.log('DATA OBJ: ', data.type, data.name);
        // create shallow copy of state's children array to manipulate
        let childrenArray = [...this.state.children];

        let nameExists = false;
        for (let i = 0; i < childrenArray.length; i++) {
          // if a bubble object doesn't exist with name property
          if (childrenArray[i].name === data.name) {
            // do something
            nameExists = true;
            childrenArray.splice(i, 1);
            console.log('CHIDLREN ARRAY: ', childrenArray);
            // return this.setState({
            //   ...this.state,
            //   children: childrenArray
            // });
          }
        }

        if (nameExists === false) {
          console.log('TEST');
          innerBubble.name = data.name;
          innerBubble.description = 'DESCRIPTION';
          innerBubble.loc = 3000;
          if (data.type === 'state-management') {
            innerBubble.color = 'hsl(228, 70%, 50%)';
          } else if (data.type === 'ui-components') {
            innerBubble.color = 'hsl(24, 70%, 50%)';
          } else if (data.type === 'router') {
            innerBubble.color = 'hsl(156, 70%, 50%)';
          }
          childrenArray.push(innerBubble);
        }

        // take location and name add to an object and push copy of state.children array
        // if data.type === 'state management' set color to blue

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
          <Bubble data={this.state} />
        </div>
      </div>
    );
  }
}

export default MakeMap;

// check if childrenArray is empty
// if (childrenArray.length === 0) {
//   innerBubble.name = data.name;
//   innerBubble.loc = 2000;
//   console.log('IN LENGTH 0 check');
//   if (data.type === 'state-management') {
//     innerBubble.color = 'hsl(228, 96%, 51%)';
//   } else if (data.type === 'ui-components') {
//     innerBubble.color = 'hsl(24, 96%, 67%)';
//   } else if (data.type === 'router') {
//     innerBubble.color = 'hsl(156, 41%, 54%)';
//   }
// }
