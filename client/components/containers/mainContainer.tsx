import React, { Component } from 'react';
import StaticContainer from './staticContainer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MakeMap from '../MakeMap';
const stats = require('npm-stat-api');
// import MainContainer from './containers/MainContainer';
class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    stats.stat('check-stats-modules','2018-07-20','2018-08-20', (err, res) => {
      console.log(JSON.stringify(res))
   });
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
