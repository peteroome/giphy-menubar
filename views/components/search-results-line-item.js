import React from 'react';
import Gif from './gif';

export default class SearchResultsLineItem extends React.Component {
  render() {
    return(
      <li className="gif">
        <Gif giphyObject={this.props.gif} key={this.props.gif.id} />
      </li>
    );
  }
}
