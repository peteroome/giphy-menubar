import React from 'react';
import Masonry from 'masonry-layout';
import SearchResultsLineItem from './search-results-line-item';

class SearchResults extends React.Component {
  componentDidUpdate() {
    let gifs = this.props.gifs;
    var msnry = new Masonry('.gif-list', {
      itemSelector: 'li.gif',
      columnWidth: 200
    });
  }

  render() {
    // let oddGifs  = [];
    // let evenGifs = [];
    let gifs = this.props.gifs;

    // Pop the last gif so we have 24, not 25.
    // 25 into two cols will never be equal.
    // gifs.pop();
    // gifs.filter((gif, index) => {
    //   if((index + 1) % 2 === 0){
    //     evenGifs.push(gif);
    //   } else {
    //     oddGifs.push(gif);
    //   }
    // });

    return(
      <div className="gif-list-container">
        <ul className='gif-list'>
          {gifs.map((gif, index) => {
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
