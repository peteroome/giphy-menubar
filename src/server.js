const path = require('path');
const { globalShortcut } = require('electron');
const keyboardShortcuts = {
  open: 'CommandOrControl+Shift+g',
  close: 'CommandOrControl+Shift+g'
};

let isShown = false;

// Menubar
const menubar = require('menubar');

const menuOptions = {
  tooltip: 'Search Giphy!',
  width: 420,
  height: 600,
  transparent: true,
  frame: false,
  alwaysOnTop: false,
  icon: path.join(__dirname, './images', 'Icon.png'),
  resizable: false,
  movable: false,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  autoHideMenuBar: true,
  index: `file://${path.join(__dirname, 'index.html')}`
};

if (process.env.NODE_ENV === 'development') {
  menuOptions.alwaysOnTop = true;
}

const menu = menubar(menuOptions);

menu.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'development') {
    menu.window.openDevTools();
  }

  globalShortcut.register(keyboardShortcuts.open, () => {
    if (isShown) {
      menu.hideWindow();
    } else {
      menu.showWindow();
    }
  });
});

menu.on('show', () => {
  menu.tray.setImage(path.join(__dirname, './images', 'IconPressed.png'));
});

menu.on('hide', () => {
  menu.tray.setImage(path.join(__dirname, './images', 'Icon.png'));
});

menu
  .on('after-show', () => (isShown = true))
  .on('after-hide', () => (isShown = false))
  .on('focus-lost', () => (isShown = false));
