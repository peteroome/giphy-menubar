import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Layout from './layout/layout'
import App from './components/app';

ReactDOM.render(
  <App />,
  document.getElementById('search-box'),
  function() {
    console.timeEnd('react-app')
  }
);
