import React from 'react';

const clipboard = window.require('remote').clipboard;

export default class Gif extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const image = this.props.images.fixed_height_downsampled;
    const divStyle = {
      width: `${image.width} px`,
      height: `${image.height} px`
    }

    return(
      <div className="gif" style={divStyle}>
        <a target="_blank" href="#" onClick={this._handleClick}>
          <img
            width={image.width}
            height={image.height}
            src={image.url}
            alt={this.props.caption}
          />
        </a>
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    clipboard.writeText(this.props.url);
    new Notification('Giphy!', {
      body: 'URL copied 🎉'
    });
  }
}
