import React from 'react';
import jQuery from 'jquery';
import Gif from './gif';

const $ = jQuery;

class SearchResultsLineItem extends React.Component {
  componentDidUpdate() {
    if (this.props.className === 'active') {
      this.li.scrollIntoViewIfNeeded(false, {
        block: 'end',
        behavior: 'smooth'
      });
    }
  }

  render() {
    return (
      <li
        className={`gif ${this.props.className}`}
        ref={(li) => { this.li = li; }}
      >
        <Gif
          giphyObject={this.props.gif}
          key={this.props.gif.id}
        />
      </li>
    );
  }
}

// Expect a gif object supplied by the Giphy API
SearchResultsLineItem.propTypes = {
  className: React.PropTypes.string,
  gif: React.PropTypes.object
};

export default SearchResultsLineItem;
