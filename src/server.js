'use strict';

import env from './env';
console.log('Loaded environment variables:', env);

require('babel-register');

const path = require('path');

const {app, Menu} = require('electron');
require('electron-reload')(__dirname);

// Analytics
const heap = require('heap-api')(process.env.HEAP_APP_ID);

// Menubar
const menubar = require('menubar');

const menuOptions = {
  tooltip: 'Search Giphy!',
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

if(env.NODE_ENV === 'development'){
  menuOptions.alwaysOnTop = true;
}

const menu = menubar(menuOptions);

function initTray(tray){
  tray.on('right-click', () => {
    var contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
      }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
  })
}

menu.on('ready', ready() => {
  heap.track('menubar:ready');
  initTray(menu.tray);
})

menu.on('show', ready() => {
  heap.track('menubar:show');
  menu.tray.setImage(path.join(__dirname, 'public/assets/images', 'IconPressed.png'));
})

menu.on('after-create-window', after() => {
  if(process.env.NODE_ENV === 'development'){
    menu.window.openDevTools();
  }
})

menu.on('hide', ready() => {
  heap.track('menubar:hide');
  menu.tray.setImage(path.join(__dirname, 'public/assets/images', 'Icon.png'));
})
