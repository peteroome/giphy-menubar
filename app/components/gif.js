import React from 'react';

const clipboard = window.require('remote').clipboard;

export default class Gif extends React.Component {
  constructor() {
    super();

    this.state = {
      hd: false
    };

    this._handleClick = this._handleClick.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseOut = this._handleMouseOut.bind(this);
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
            onMouseOver={this._handleMouseOver}
            onMouseOut={this._handleMouseOut}
          />
        </a>
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    clipboard.writeText(this.props.images.original.url);
    new Notification('Giphy!', {
      body: 'URL copied 🎉'
    });
  }

  _handleMouseOver(e){
    const imageHD = this.props.images.fixed_height;
    const imageSD = this.props.images.fixed_height_downsampled;
    const img = e.currentTarget;

    if (!this.state.hd) {
      img.src = imageHD.url;
      this.setState({
        hd: true
      })
    }
  }

  _handleMouseOut(e){
    const imageHD = this.props.images.fixed_height;
    const imageSD = this.props.images.fixed_height_downsampled;
    const img = e.currentTarget;

    if (this.state.hd) {
      img.src = imageSD.url;
      this.setState({
        hd: false
      })
    }
  }
}
