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

SearchResultsLineItem.propTypes = {
  gif: React.PropTypes.instanceOf(Gif)
};

export default SearchResultsLineItem;
