(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

require('babel-register');

console.log('Loaded environment variables:', env);

let path = require('path')

const {app, Menu} = require('electron');
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

function initTray(tray){
  tray.on('right-click', function(){
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

menu.on('ready', function ready(){
  heap.track('menubar:ready');
  initTray(menu.tray);
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

}());
//# sourceMappingURL=server.js.map