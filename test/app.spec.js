import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import App from '../views/components/search-box';
import Footer from '../views/components/footer';

describe("<App />", () => {
  const component = shallow(<App />);

  describe('#render()', () => {
    it('should render a Footer', () => {
      let footerComponent = component.find(Footer);
      console.log(footerComponent);
      expect(footerComponent.length).to.equal(1);
    });
  });
});
