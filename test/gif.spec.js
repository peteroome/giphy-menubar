import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { spy, stub } from 'sinon';

import React from 'react';

import Gif from '../views/components/gif';

describe("<Gif />", () => {
  let gifObj = {
    'images': {
      'fixed_width_downsampled': {
        'id': 1,
        'width': 10,
        'height': 10,
        'url': 'https://media.giphy.com/media/p9YxiqiLdN0xq/giphy.gif?obj=fwd',
        'caption': 'PUPPY'
      },
      'fixed_width': {
        'url': 'https://media.giphy.com/media/p9YxiqiLdN0xq/giphy.gif?obj=fw'
      },
      'original': {
        'url': 'https://media.giphy.com/media/p9YxiqiLdN0xq/giphy.gif?obj=original'
      }
    }
  }

  const component = shallow(
    <Gif
      giphyObject={gifObj}
      key='1'
    />
  );

  const mountComponent = mount(
    <Gif
      giphyObject={gifObj}
      key='1'
    />
  );

  let defaultState = {
    hd: false
  };

  var event = {
    preventDefault: spy(),
    currentTarget: {
      'src': ''
    }
  };

  describe('#constructor()', () => {
    it('sets a default state', () => {
      expect(component.state()).to.eql(defaultState);
    });
  });

  describe('#render()', () => {
    it('contains an li.gif', () => {
      expect(component.find('li.gif').length).to.equal(1);
    });

    it('should render an img tag', () => {
      let imgTag = component.find('img')
      expect(imgTag.length).to.equal(1);

      let imgProps = [
        'width',
        'height',
        'src',
        'alt',
        'onMouseOver',
        'onMouseOut',
        'onClick'
      ]

      imgProps.forEach((prop) => {
        assert.isDefined(imgTag.prop(prop));
      });
    });

    it('has an onMouseOver property assigned the handleMouseOver function', () => {
      let imgTag = component.find('img')
      expect(imgTag.prop('onMouseOver'))
        .to
        .equal(component.instance().handleMouseOver);
    });

    it('has an onMouseOut property assigned the handleMouseOut function', () => {
      let imgTag = component.find('img')
      expect(imgTag.prop('onMouseOut'))
        .to
        .equal(component.instance().handleMouseOut);
    });

    it('has an onClick property assigned the handleClick function', () => {
      let imgTag = component.find('img')
      expect(imgTag.prop('onClick'))
        .to
        .equal(component.instance().handleClick);
    });
  });

  describe('#handleClick()', () => {
    // Not sure how to test with the clipboard.
    it('has copies the gif URL to the clipboard');
  });

  describe('#handleMouseOver()', () => {
    it('loads the HD version of the gif', () => {
      var handleMouseOverSpy = spy(mountComponent.node, 'handleMouseOver');
      mountComponent.node.handleMouseOver(event);

      expect(mountComponent.state('hd')).to.equal(true);
      expect(event.currentTarget.src).to.equal(
        gifObj.images.fixed_width.url
      );
    });
  });

  describe('#handleMouseOut()', () => {
    it('loads the SD version of the gif', () => {
      var handleMouseOutSpy = spy(mountComponent.node, 'handleMouseOut');
      mountComponent.node.handleMouseOut(event);

      expect(mountComponent.state('hd')).to.equal(false);
      expect(event.currentTarget.src).to.equal(
        gifObj.images.fixed_width_downsampled.url
      );
    });
  });
});
