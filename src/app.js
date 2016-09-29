'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/components/app';

ReactDOM.render(
  <App />,
  document.getElementById('app-container'), () => {
    console.timeEnd('react-app');
  }
);
