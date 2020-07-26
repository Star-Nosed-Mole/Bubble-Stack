import React, { Component } from 'react';
import StaticContainer from './staticContainer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MakeMap from '../MakeMap';
// import MainContainer from './containers/MainContainer';
class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <h1>Bubble-Stack</h1>
            <button>
              <Link to="/make">Create New Stack</Link>
            </button>
            <Switch>
              <Route path="/make">
                <MakeMap />
              </Route>
              <Route path="/">
                <StaticContainer />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default MainContainer;
