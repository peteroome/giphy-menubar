jest.unmock('../views/components/offline');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Offline from '../views/components/offline';

describe('Offline', () => {
  it('shows an offline message', () => {
    // Render a checkbox with label in the document
    const offline = TestUtils.renderIntoDocument(
      <Offline />
    );

    const offlineNode = ReactDOM.findDOMNode(offline);

    // Verify that it's Off by default
    expect(offlineNode.textContent).toEqual('You are currently offline.');
  });
});
