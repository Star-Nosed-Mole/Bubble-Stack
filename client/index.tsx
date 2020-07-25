import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const style = require('./style.scss');
render(
      <App compiler='TypeScript' framework='React' />,
      document.getElementById('root')
);

