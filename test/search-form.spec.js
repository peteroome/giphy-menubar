import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';
import ReactDom from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

import SearchForm from '../views/components/search-form';

describe('SearchForm', () => {
  var setSearchTerm = spy();
  var newSearch = spy();

  const component = shallow(
    <SearchForm
      onUpdate={setSearchTerm}
      currentSearchTerm={'puppy'}
      newSearch={newSearch}
    />
  );

  const mountComponent = mount(
    <SearchForm
      onUpdate={setSearchTerm}
      currentSearchTerm={'puppy'}
      newSearch={newSearch}
    />
  );

  var event = {
    preventDefault: spy(),
    currentTarget: spy()
  };

  describe('#render()', () => {
    it('shows a form-holder', () => {
      var element = component.find('.form-holder');

      expect(element.length).to.equal(1);
    });

    it('shows a search-form', () => {
      var element = component.find('.search-form');

      expect(element.length).to.equal(1);
      assert.isDefined(element.prop('onSubmit'));
      expect(element.prop('onSubmit')).to.equal(
        component.instance().handleSubmit
      );
    });

    it('contains the right html elements in the form', () => {
      var element = component.find('.search-form');

      expect(element.find('input').length).to.equal(1);
      expect(element.find('input').prop('onChange')).to.equal(
        component.instance().handleChange
      );
      expect(element.find('button[type="submit"]').length).to.equal(1);
    });
  });

  describe('#handleSubmit()', () => {
    it('calls handleSubmit', () => {
      spy(mountComponent.node, 'handleSubmit');
      mountComponent.handleSubmit(event);

      assert(event.preventDefault.calledOnce);
    });
  });
});
