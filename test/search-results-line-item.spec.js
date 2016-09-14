import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import SearchResultsLineItem from '../views/components/search-results-line-item';
import Gif from '../views/components/gif';

describe("<SearchResultsLineItem />", () => {
  let gifObj = {
    'id': 123
  };

  const component = shallow(
    <SearchResultsLineItem
      key={1}
      gif={gifObj}
    />
  );

  describe('#render()', () => {
    it('contains a li.gif', () => {
      expect(component.find('.gif').length).to.equal(1);
    });

    it('contains a <Gif />', () => {
      let gifComponent = component.find(Gif);

      expect(gifComponent.length).to.equal(1);
      expect(gifComponent.prop('giphyObject')).to.equal(gifObj);
    });
  });
});
