import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy } from 'sinon';
import jsdom from 'jsdom';;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import SearchBox from '../views/components/search-box';

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

  it('has a fixed-content div', () => {
    expect(component.find('.fixed-content').length).to.equal(1);
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

    expect(component.find('SearchForm').prop('onUpdate')).isDefined;
    expect(component.find('SearchForm').prop('newSearch')).isDefined;
  });

  it('should render a Footer', () => {
    expect(component.find('Footer').length).to.equal(1);
    expect(component.find('Footer').prop('fetchGifs')).isDefined;
    expect(component.find('Footer').prop('clearSearch')).isDefined;
  });

  it('should render some SearchResults', () => {
    expect(component.find('SearchResults').length).to.equal(1);
    expect(component.find('SearchResults').prop('gifs')).isDefined;
  });

  it('should trigger pagination when the window scrolls', () => {
    const component = mount(<SearchBox />);
    // console.log("Hello: ", jsdom.serializeDocument(window.document))

    component.handleScroll = spy();
    component.find('.search-box').simulate('scroll')
    expect(component.handleScroll.called).to.be.true;
  });

  // it('calls componentDidMount', () => {
  //   SearchBox.prototype.componentDidMount = spy();
  //   const wrapper = mount(<SearchBox />);
  //   expect(SearchBox.prototype.componentDidMount).toBeCalled();
  // });
});
