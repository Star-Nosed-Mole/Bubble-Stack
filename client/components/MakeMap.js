import React, { Component } from 'react';
import Bubble from './Bubble';

// import MainContainer from './containers/MainContainer';
class MakeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      children: [
        {
          name: 'Redux',
          color: 'hsl(191, 70%, 50%)',
          loc: 13285
        },
        {
          name: 'Bootstrap',
          color: 'hsl(191, 70%, 50%)',
          loc: 13285
        }
      ]
    };

    this.getData = this.getData.bind(this);
    this.hideBtn = this.hideBtn.bind(this)

  }

  componentDidMount () {
    this.hideBtn();
  }

  hideBtn() {
		let d = document.getElementById('stack-btn');
		d.style.display = "none";
  }

  getData(tech) {
    fetch('/api/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json'
      },
      body: JSON.stringify({ name: tech })
    })
      .then((res) => res.json())
      .then((data) => {
        let childrenArray = this.state.children;
        childrenArray.push(data[0]);
        this.setState({
          children: childrenArray
        });
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
