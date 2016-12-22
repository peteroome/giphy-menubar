const path = require('path');

const { Menu } = require('electron');

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

function initTray(tray) {
  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
      }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
  });
}

menu.on('ready', () => {
  initTray(menu.tray);
});

menu.on('show', () => {
  menu.tray.setImage(path.join(__dirname, './images', 'IconPressed.png'));
});

menu.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'development') {
    menu.window.openDevTools();
  }
});

menu.on('hide', () => {
  menu.tray.setImage(path.join(__dirname, './images', 'Icon.png'));
});
