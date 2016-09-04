import React from 'react';

export default class Footer extends React.Component {
  constructor() {
    super();

    this.state = {
      hd: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    return (
      <footer>
        <div className="left-side">
          <p><a onClick={this._handleClick}>#trending</a></p>
        </div>
        <div className="right-side">
          <p>Built by <a href="http://peteroo.me">Pete Roome</a></p>
        </div>
      </footer>
    );
  }

  _handleClick(event) {
    event.preventDefault();
    this.props.fetchGifs();
    this.props.clearSearch();
    window.scrollTo(0, 0);
  }
}
