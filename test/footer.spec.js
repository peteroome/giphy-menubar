import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import Footer from '../views/components/footer';

describe("<Footer />", () => {
  const component = shallow(<Footer />);
  const mountComponent = mount(<Footer />);

  var event = {
    preventDefault: spy(),
    currentTarget: {
      'src': ''
    }
  };

  describe('#render()', () => {
    it('contains a .right-side', () => {
      expect(component.find('.right-side').length).to.equal(1);
    });

    describe('svg', () => {
      it('should render an svg link', () => {
        var link = component.find('a.nav__pete');
        expect(link.length).to.equal(1);
        expect(link.find('svg').length).to.equal(1);
      });
    });
  });
});
