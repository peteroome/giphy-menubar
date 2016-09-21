import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import SearchResults from '../views/components/search-results';
import SearchResultsLineItem from '../views/components/search-results-line-item';

describe("<SearchResults />", () => {
  let gifs = [
    {'id': 123},
    {'id': 456},
    {'id': 789},
    {'id': 999}
  ];

  const component = shallow(
    <SearchResults gifs={gifs} />
  );

  describe('#render()', () => {
    it('contains a .gif-list-container', () => {
      expect(component.find('.gif-list-container').length).to.equal(1);
    });

    it('contains a ul.gif-list', () => {
      let elements = component.find('ul.gif-list');
      expect(elements.length).to.equal(1);
    });

    it('contains some <SearchResultsLineItem /> components', () => {
      let childComponents = component.find(SearchResultsLineItem);
      expect(childComponents.length).to.equal(4);
    });
  });
});
