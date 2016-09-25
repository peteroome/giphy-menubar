require('babel-register')();
import 'babel-polyfill';

import { jsdom } from 'jsdom';;

let exposedProperties = ['window', 'navigator', 'document'];

// setup the simplest document possible
global.document = jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the document
global.window = document.defaultView;

// Setup to help pass the Masonry related tests
global.Element = function(){};

// take all properties of the window object and also attach it to the
// mocha global object
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
