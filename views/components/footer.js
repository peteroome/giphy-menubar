import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <footer>
        <div className="left-side">
          <p><a className="nav__trending" onClick={this.handleClick}>#trending</a></p>
        </div>
        <div className="right-side">
          <p>Built by <a className="nav__pete" href="http://peteroo.me">Pete Roome</a></p>
        </div>
      </footer>
    );
  }

  handleClick(event) {
    event.preventDefault();
    this.props.fetchGifs();
    this.props.clearSearch();
    window.scrollTo(0, 0);
  }
}
