import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import Offline from '../views/components/offline';

describe('Offline', () => {
  var tryAgain = spy();

  const component = shallow(
    <Offline tryAgain={tryAgain} />
  );

  describe('#render()', () => {
    it('shows an offline message', () => {
      var h1 = component.find('h1');
      expect(h1.text()).to.equal('No Internet Connection.');
    });

    it('has a refresh button', () => {
      var button = component.find('button');
      expect(button.length).to.equal(1);
      expect(button.contains(
        <img src="public/assets/images/icons/ic_refresh_white_36px.svg" alt="Refresh"/>
      )).to.equal(true);
    });

    it('has an onClick prop on the button', () => {
      var button = component.find('button');

      assert.isDefined(button.prop('onClick'));
      expect(button.prop('onClick')).to.equal(tryAgain);
    });

    it('calls tryAgain when the Try Again button is clicked', () => {
      var button = component.find('button');
      button.simulate('click');

      assert(tryAgain.calledOnce);
    });
  });
});
