import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {hashHistory, Router, Route, Redirect} from 'react-router';

import Layout from './layout/layout'

import SearchPage from './pages/search'

const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/search" />
    <Route path="/" component={Layout}>
      <Route path="search" component={SearchPage} />
    </Route>
  </Router>
)

ReactDOM.render(
  app,
  document.getElementById('search-box'),
  function() {
    console.timeEnd('react-app')
  }
);
