
/* eslint linebreak-style: ["error", "windows"] */


import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Routing from './Routing.jsx';

const element = (<Router>
    <Routing />
  </Router>
);


ReactDOM.render(element, document.getElementById('contents'));
