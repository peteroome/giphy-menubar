const KEYS = {
  enter: 13,
  up: 38,
  down: 40
};

const pressedKeys = {};

function isKeyPressed (key) {
  const keyCode = key in KEYS ? KEYS[key] : key;
  return pressedKeys[keyCode];
}

export function shortcutsOnKeyDown(event) {
  pressedKeys[event.which] = true;
}

export function shortcutsOnKeyUp(event) {
  pressedKeys[event.which] = null;
}

export function onKeyboardShortcut(event, shortcuts) {
  if (typeof shortcuts !== 'function') return;

  return shortcuts.reduce((result, handler, key) => {
    const keyCode = KEYS[key] || key;
    console.log('keypressed: ', keyCode);
    let newResult;

    if (keyCode === event.keyCode) {
      if (handler(event) === false) {
        newResult = false;
      }
    }

    return newResult;
  }, true);
}
