'use strict';
require('dotenv').config();

let path = require('path')

const {app} = require('electron');
require('electron-reload')(__dirname);

// Analytics
let heap = require('heap-api')(process.env.HEAP_APP_ID);

// Menubar
const menubar = require('menubar');

let menuOptions = {
  tooltip: "Search Giphy!",
  width: 420,
  height: 600,
  transparent: true,
  frame: false,
  alwaysOnTop: false,
  icon: path.join(__dirname, 'public/assets/images', 'Icon.png'),
  resizable: false,
  movable: false,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  autoHideMenuBar: true
};

if(process.env.NODE_ENV === 'development'){
  menuOptions.alwaysOnTop = true;
}

let menu = menubar(menuOptions);

menu.on('ready', function ready(){
  heap.track('menubar:ready');
})

menu.on('show', function ready(){
  heap.track('menubar:show');
  menu.tray.setImage(path.join(__dirname, 'public/assets/images', 'IconPressed.png'));
})

menu.on('after-create-window', function after(){
  if(process.env.NODE_ENV === 'development'){
    menu.window.openDevTools();
  }
})

menu.on('hide', function ready(){
  heap.track('menubar:hide');
  menu.tray.setImage(path.join(__dirname, 'public/assets/images', 'Icon.png'));
})
