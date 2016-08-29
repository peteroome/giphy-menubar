import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>Gif It Real Good</h1>
        {this.props.children}
      </div>
    )
  }
}
