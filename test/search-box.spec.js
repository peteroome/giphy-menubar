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

  const mountComponent = mount(
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

  it('contains a search-box', () => {
    expect(component.find('.search-box').length).to.equal(1);
  });

  it('should render a SearchForm', () => {
    expect(component.find('SearchForm').length).to.equal(1);
    assert.isDefined(component.find('SearchForm').prop('newSearch'));
  });

  it('should render some SearchResults', () => {
    expect(component.find('SearchResults').length).to.equal(1);

    assert.isDefined(component.find('SearchResults').prop('gifs'));
    expect(component.find('SearchResults').prop('gifs')).to.be.an('array');
  });

  describe('#handleScroll()', () => {
    it('has an onScroll property assigned the handleScroll function', () => {
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

  describe('#newSearch()', () => {
    var clearSearchSpy = spy(mountComponent.node, 'newSearch');

    it('sets the searchTerm state to the new search', () => {
      mountComponent.node.newSearch('Puppies');
      expect(mountComponent.state('searchTerm')).to.equal('Puppies');
      expect(mountComponent.state('offset')).to.equal(0);
    });

    it('calls the callback if provided', () => {
      var callbackSpy = spy();

      mountComponent.node.newSearch('Puppies', callbackSpy);
      assert(callbackSpy.calledOnce);
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
      var clearSearchSpy = spy(mountComponent.node, 'clearSearch');
      mountComponent.setState({
        searchTerm: "Hello World"
      });

      expect(mountComponent.state('searchTerm')).to.equal('Hello World');

      mountComponent.node.clearSearch();
      expect(mountComponent.state('searchTerm')).to.equal('');
    });
  });
});
