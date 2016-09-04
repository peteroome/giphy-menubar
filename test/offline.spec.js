import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Offline from '../views/components/offline';

describe('Offline', () => {
  const component = shallow(
    <Offline />
  );

  it('shows an offline message', () => {
    expect(component.text()).to.equal('You are currently offline.');
  });
});
