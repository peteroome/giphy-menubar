'use babel'

import React from 'react';
import ReactDOM from 'react-dom';

// Analytics
import dotenv from 'dotenv'
dotenv.config();
const heapID = process.env.HEAP_APP_ID
console.log("HEAP: ", process.env.HEAP_APP_ID);
console.log("Hello world");

import jQuery from 'jquery';
import Layout from '../../../views/layout/layout'
import App from '../../../views/components/app';

ReactDOM.render(
  <App />,
  document.getElementById('search-box'),
  function() {
    console.timeEnd('react-app')
  }
);
