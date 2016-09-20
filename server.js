'use strict';
require('dotenv').config();

let path = require('path')

const {app} = require('electron');
require('electron-reload')(__dirname);

// Analytics
let heap = require('heap-api')(process.env.HEAP_APP_ID);

// Menubar
const menubar = require('menubar')

let menu = menubar({
  tooltip: "Search Giphy!",
  width: 420,
  height: 600,
  transparent: true,
  frame: false,
  alwaysOnTop: true,
  icon: path.join(__dirname, 'public/assets/images', 'Icon.png'),
  resizable: false,
  movable: false,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  autoHideMenuBar: true
})

menu.on('ready', function ready(){
  console.log('Ready…');
})

menu.on('after-create-window', function after(){
  console.log('after-create-window.');
  menu.window.openDevTools();
})
