'use babel'

import env from './env';

import React from 'react';
import ReactDOM from 'react-dom';

// Analytics
import dotenv from 'dotenv'
dotenv.config();
const heapID = process.env.HEAP_APP_ID

import App from './views/components/app';

ReactDOM.render(
  <App />,
  document.getElementById('app-container'), () => {
    console.timeEnd('react-app');
  }
);
