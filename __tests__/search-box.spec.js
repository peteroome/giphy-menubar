jest.unmock('../views/components/search-box');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchBox from '../views/components/search-box';

describe('SearchBox', () => {
  const searchBox = renderer.create(
    <SearchBox />
  );

  let defaultState = {
    gifs: [],
    loadingFlag: false,
    offset: 0,
    searchTerm: ''
  };

  it('sets state to a blank search by default', () => {
    expect(searchBox.state).toEqual(defaultState);
  });

  // it('can fetch some gifs');
  // it('can paginate through the giphy API');
  // it('fetches gifs when it mounts');
  // it('paginates on scroll');
  // it('sets the search term');
  // it('clears the search term');
  // it('can do a new clean search');
});
