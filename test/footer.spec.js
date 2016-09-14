import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import Footer from '../views/components/footer';

describe("<Footer />", () => {
  var fetchGifs = spy();
  var clearSearch = spy();

  const component = shallow(
    <Footer
      fetchGifs={fetchGifs}
      clearSearch={clearSearch}
    />
  );

  const mountComponent = mount(
    <Footer
      fetchGifs={fetchGifs}
      clearSearch={clearSearch}
    />
  );

  var event = {
    preventDefault: spy(),
    currentTarget: spy()
  };

  describe('#render()', () => {
    it('contains a .left-side', () => {
      expect(component.find('.left-side').length).to.equal(1);
    });

    it('contains a .right-side', () => {
      expect(component.find('.right-side').length).to.equal(1);
    });

    it('should render a #trending link', () => {
      var link = component.find('a.nav__trending');
      expect(link.length).to.equal(1);
      expect(link.text()).to.equal('#trending');
    });

    it('render a #trending link with an onClick property assigned the handleClick function', () => {
      var link = component.find('a.nav__trending');
      expect(link.prop('onClick')).to.equal(component.instance().handleClick);
    });

    it('should render an svg link', () => {
      var link = component.find('a.nav__pete');
      expect(link.length).to.equal(1);
      expect(link.find('svg').length).to.equal(1);
    });
  });

  describe('#handleClick()', () => {
    it('calls both our props', () => {
      var handleClickSpy = spy(mountComponent.node, 'handleClick');
      mountComponent.node.handleClick(event);
      assert(fetchGifs.calledOnce);
      assert(clearSearch.calledOnce);
    });
  });
});
