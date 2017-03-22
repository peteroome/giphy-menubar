import React from 'react';
import Analytics from 'electron-google-analytics';
import env from './../../env';

const analytics = new Analytics(env.ga_ua_id, {
  userAgent: 'com.peteroome.gif-bar',
  debug: env.ga_debug
});

const electron = window.require('electron');
const remote = electron.remote;
const clipboard = remote.clipboard;

class Gif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: false
    };

    this.clipboard = window.clipboard || {};

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.image = this.props.giphyObject.images.fixed_width_downsampled;
    this.imageHD = this.props.giphyObject.images.fixed_width;
    this.copyUrl = this.props.giphyObject.images.fixed_width.url;
  }

  handleClick(event) {
    const sampleCues = [
      '#🔥download-gif-bar🔥->https://goo.gl/jOrQYi',
      '#🙌download-gif-bar-for-osx-👉👉👉-https://goo.gl/c9YLqx',
      '#👉👉👉-download-gif-bar-for-osx-👉👉👉-https://goo.gl/ppH2k1',
    ];
    const randCue = sampleCues[Math.floor(Math.random() * sampleCues.length)];

    event.preventDefault();

    clipboard.writeText(this.copyUrl + randCue);
    new Notification('Giphy!', {
      body: 'URL copied 🎉'
    });

    analytics.event('Gif', 'clicked');
  }

  handleMouseOver(event) {
    const img = event.currentTarget;

    if (!this.state.hd) {
      img.src = this.imageHD.url;
      this.setState({
        hd: true
      });
    }
  }

  handleMouseOut(event) {
    const img = event.currentTarget;

    if (this.state.hd) {
      img.src = this.image.url;
      this.setState({
        hd: false
      });
    }
  }

  render() {
    return (
      <a
        href={this.image.url}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      >
        <img
          width={this.image.width}
          height={this.image.height}
          src={this.image.url}
          alt={this.image.caption}
        />
      </a>
    );
  }
}

Gif.propTypes = {
  giphyObject: React.PropTypes.object
};

export default Gif;
