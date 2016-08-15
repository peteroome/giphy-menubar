import React from 'react';
import Masonry from 'react-masonry-component';

export default class SearchResults extends React.Component {
  render() {
    return(
      <div className="gif-list-container">
        <Masonry
            className={'gif-list'} // default ''
            elementType={'ul'} // default 'div'
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
        >
          {this.props.gifs}
        </Masonry>
      </div>
    )
  }

  componentDidUpdate(){
    // Masonry.reloadItems();
  }
}
