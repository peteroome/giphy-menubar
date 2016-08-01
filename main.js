'use strict';

let path = require('path')

require('electron-reload')(__dirname);

// Menubar
const menubar = require('menubar')
let menu = menubar({
  tooltip: "Search Giphy?",
  width: 420,
  height: 600,
  alwaysOnTop: true,
  transparent: true,
  frame: false,
  icon: path.join(__dirname, 'public/assets/images', 'Icon.png'),
  y: 20
})

menu.on('ready', function ready(){
  console.log('Ready…');
})

menu.on('after-create-window', function after(){
  console.log('after-create-window.');
  menu.window.openDevTools()
})
