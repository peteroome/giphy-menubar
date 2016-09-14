import React from 'react';
import SearchResultsLineItem from './search-results-line-item';

class SearchResults extends React.Component {
  render() {
    let oddGifs  = [];
    let evenGifs = [];
    let gifs = this.props.gifs;

    // Pop the last gif so we have 24, not 25.
    // 25 into two cols will never be equal.
    gifs.pop();
    gifs.filter((gif, index) => {
      if((index + 1) % 2 === 0){
        evenGifs.push(gif);
      } else {
        oddGifs.push(gif);
      }
    });

    return(
      <div className="gif-list-container">
        <ul className='gif-list left'>
          {oddGifs.map((gif, index) => {
            return(
              <SearchResultsLineItem key={index} gif={gif} />
            );
          })}
        </ul>
        <ul className='gif-list right'>
          {evenGifs.map((gif, index) => {
            return(
              <SearchResultsLineItem key={index} gif={gif} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
