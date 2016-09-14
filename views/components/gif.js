import React from 'react';

export default class Gif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hd: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.image = this.props.giphyObject.images.fixed_width_downsampled;
    this.imageHD = this.props.giphyObject.images.fixed_width;
    this.copyUrl = this.props.giphyObject.images.original.url;
  }

  render() {
    return(
      <img
        width={this.image.width}
        height={this.image.height}
        src={this.image.url}
        alt={this.image.caption}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      />
    );
  }

  handleClick(event) {
    event.preventDefault();

    clipboard.writeText(this.copyUrl);
    new Notification('Giphy!', {
      body: 'URL copied 🎉'
    });
  }

  handleMouseOver(event){
    const img = event.currentTarget;

    if (!this.state.hd) {
      img.src = this.imageHD.url;
      this.setState({
        hd: true
      })
    }
  }

  handleMouseOut(event){
    const img = event.currentTarget;

    if (this.state.hd) {
      img.src = this.image.url;
      this.setState({
        hd: false
      })
    }
  }
}
