const electron = window.require('electron');
const remote = electron.remote;
const clipboard = remote.clipboard;

export function copyToClipboard (event, copyUrl) {
  event.preventDefault();

  const sampleCues = [
    '#🔥download-gif-bar🔥->https://goo.gl/jOrQYi',
    '#🙌download-gif-bar-for-osx-👉👉👉-https://goo.gl/c9YLqx',
    '#👉👉👉-download-gif-bar-for-osx-👉👉👉-https://goo.gl/ppH2k1',
  ];
  const randCue = sampleCues[Math.floor(Math.random() * sampleCues.length)];

  clipboard.writeText(copyUrl + randCue);
  new Notification('Giphy!', {
    body: 'URL copied 🎉'
  });
}
