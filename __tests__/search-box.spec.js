import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../views/components/search-box');

import SearchBox from '../views/components/search-box';

describe("Search box", () => {
  const component = shallow(
    <SearchBox />
  );

  let defaultState = {
    gifs: [],
    loadingFlag: false,
    offset: 0,
    searchTerm: ''
  };

  it('sets a default state', () => {
    expect(component.state()).toEqual(defaultState);
  });

  it('contains a gif-container', () => {
    expect(component.find('.gifs-container').length).toBe(1);
  });

  it('has a fixed-content div', () => {
    expect(component.find('.fixed-content').length).toBe(1);
  });

  pit('clears the search term');

  it('gets some gifs on componentWillMount', () => {
    const Scomponent = ReactTestUtils.renderIntoDocument(
      <SearchBox />
    );
    Scomponent.componentWillMount();
    Scomponent._fetchGifs = jest.genMockFunction();
    expect(Scomponent._fetchGifs).toBeCalled();
  });

  pit('can fetch some gifs');
  pit('can paginate through the giphy API');
  pit('fetches gifs when it mounts');
  pit('paginates on scroll');
  pit('sets the search term');
  pit('can do a new clean search');
});
