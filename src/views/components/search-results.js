import React from 'react';
import Masonry from 'react-masonry-component';
import SearchResultsLineItem from './search-results-line-item';

let masonryOptions = {
  transitionDuration: 0
};

class SearchResults extends React.Component {
  render() {
    return(
      <div className="gif-list-container">
        <Masonry
          elementType={'ul'}
          className='gif-list'
          options={masonryOptions}
        >
          {this.props.gifs.map((gif, index) => {
            return(
              <SearchResultsLineItem key={index} gif={gif} />
            );
          })}
        </Masonry>
      </div>
    );
  }
}

export default SearchResults;
