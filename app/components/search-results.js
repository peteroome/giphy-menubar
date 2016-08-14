import React from 'react';

export default class SearchResults extends React.Component {
  render() {
    return(
      <div className="gif-list-container">
        <ul className="gif-list">
          {this.props.gifs}
        </ul>
      </div>
    );
  }
}
