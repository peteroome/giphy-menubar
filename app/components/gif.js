import React from 'react';

export default class Gif extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="gif">
        <a target="_blank" href={this.props.url}>
          <img src={this.props.images.fixed_height.url} alt="Gif" />
        </a>
      </div>
    );
  }
}
