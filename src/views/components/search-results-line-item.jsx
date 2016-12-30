import React from 'react';
import Gif from './gif';

class SearchResultsLineItem extends React.Component {
  render() {
    return (
      <li className="gif">
        <Gif giphyObject={this.props.gif} key={this.props.gif.id} />
      </li>
    );
  }
}

// Expect a gif object supplied by the Giphy API
SearchResultsLineItem.propTypes = {
  gif: React.PropTypes.object
};

export default SearchResultsLineItem;
