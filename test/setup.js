require('babel-register');
import 'babel-polyfill';

// import { jsdom } from 'jsdom';;
//
// let exposedProperties = ['window', 'navigator', 'document'];
//
// // setup the simplest document possible
// global.document = jsdom('<!doctype html><html><body></body></html>');
//
// // get the window object out of the document
// global.window = document.defaultView;
//
// // take all properties of the window object and also attach it to the
// // mocha global object
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
//
// global.navigator = {
//   userAgent: 'node.js'
// };


var jsdom = require('jsdom')

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc
global.window = win

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
