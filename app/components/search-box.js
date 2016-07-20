import React from 'react';
import jQuery from 'jquery';

import SearchForm from './search-form';
import Gif from './gif';

export default class SearchBox extends React.Component {

  constructor() {
    super();

    this.state = {
      gifs: []
    };

    this._fetchGifs = this._fetchGifs.bind(this);
  }

  componentWillMount() {
    this._fetchGifs();
  }

  render() {
    const gifs = this._getGifs();
    return(
      <div className="row gifs-container">
        <div className="cell">
          <div className="search-box">
            <SearchForm fetchGifs={this._fetchGifs} />

            <div className="gif-list">
              {gifs}
            </div>
          </div>
        </div>
      </div>

    );
  }

  _getGifs() {
    return this.state.gifs.map((gif) => {
      return <Gif
               {...gif}
               key={gif.id} />
    });
  }

  _fetchGifs(searchTerm) {
    let queryUrl = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    if(searchTerm) {
      queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`;
    }

    jQuery.ajax({
      method: 'GET',
      url: queryUrl,
      success: (gifs) => {
        this.setState({ gifs: gifs.data })
      }
    });
  }

}
