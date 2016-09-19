import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import jQuery from 'jquery';
const $ = jQuery;

import SearchBox from '../views/components/search-box';
import Gif from '../views/components/gif';

describe("<SearchBox />", () => {
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
    expect(component.state()).to.eql(defaultState);
  });

  it('contains a gif-container', () => {
    expect(component.find('.search-box').length).to.equal(1);
  });

  it('should render a SearchForm', () => {
    expect(component.find('SearchForm').length).to.equal(1);
    expect(
      component.setState({
        searchTerm: 'Hello World'
      })
      .find('SearchForm')
        .prop('currentSearchTerm')
    ).to.equal('Hello World')

    assert.isDefined(component.find('SearchForm').prop('onUpdate'));
    assert.isDefined(component.find('SearchForm').prop('newSearch'));
  });

  it('should render some SearchResults', () => {
    expect(component.find('SearchResults').length).to.equal(1);

    assert.isDefined(component.find('SearchResults').prop('gifs'));
    expect(component.find('SearchResults').prop('gifs')).to.be.an('array');
  });

  describe('#handleScroll()', () => {
    it('has an onScroll property assigned the handleScroll function', () => {
      const component = shallow(<SearchBox />);
      expect(
        component
          .find('.search-results')
          .prop('onScroll')
      )
      .to
      .equal(
        component.instance().handleScroll
      );
    });

    it('should trigger pagination when close to the bottom of the div');
  });

  describe('#componentDidMount()', () => {
    it('calls componentDidMount', () => {
      SearchBox.prototype.componentDidMount = spy();
      const wrapper = mount(<SearchBox />);
      expect(SearchBox.prototype.componentDidMount.called).to.be.true;
    });
  });

  describe('#searchTerm()', () => {
    it('sets the search term when searchTerm is called', () => {
      const component = mount(<SearchBox />);
      var setSearchTermSpy = spy(component.node, 'setSearchTerm');
      component.node.setSearchTerm('Hello World')

      expect(component.state('searchTerm')).to.equal('Hello World');
    });
  });

  describe('#newSearch()', () => {
    it('sets the searchTerm state to the new search', () => {
      const component = mount(<SearchBox />);
      var clearSearchSpy = spy(component.node, 'newSearch');

      component.node.newSearch('Puppies');
      expect(component.state('searchTerm')).to.equal('Puppies');
      expect(component.state('offset')).to.equal(0);
    });
  });

  describe('#fetchGifs()', () => {
    it('fetches gifs from Giphy');

    describe('when no results were previously found', () => {
      it('does not return any gifs');
    });
  });

  describe('#clearSearch()', () => {
    it('clears the search when clearSearch is called', () => {
      const component = mount(<SearchBox />);
      var clearSearchSpy = spy(component.node, 'clearSearch');
      component.setState({
        searchTerm: "Hello World"
      });

      expect(component.state('searchTerm')).to.equal('Hello World');

      component.node.clearSearch();
      expect(component.state('searchTerm')).to.equal('');
    });
  });
});
