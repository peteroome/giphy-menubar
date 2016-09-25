import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import App from '../views/components/app';
import Footer from '../views/components/footer';

describe("<App />", () => {
  const component = shallow(<App />);

  describe('#render()', () => {
    it('should contain .app', () => {
      let elements = component.find('.app');
      expect(elements.length).to.equal(1);
    });

    it('should render a Footer', () => {
      let elements = component.find(Footer);
      expect(elements.length).to.equal(1);
    });
  });
});
