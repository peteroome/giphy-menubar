import React from 'react';
import jQuery from 'jquery';

import env from './../../env';
import SearchForm from './search-form';
import SearchResults from './search-results';

const $ = jQuery;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      loadingFlag: false,
      offset: 0,
      searchTerm: ''
    };

    this.newSearch = this.newSearch.bind(this);
    this.fetchGifs = this.fetchGifs.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillMount() {
    this.fetchGifs();
  }

  handleScroll(event) {
    const searchResults = event.currentTarget;
    const $contentHolder = $('ul', searchResults)[0];

    if ($contentHolder) {
      const bottomOfContent = $contentHolder.offsetHeight;
      const scrollTop = searchResults.scrollTop;
      const searchResultsHeight = searchResults.offsetHeight;
      const totalScrolled = scrollTop + searchResultsHeight;

      // user reached at bottom
      if (totalScrolled >= bottomOfContent) {
        // to avoid multiple requests
        if (!this.state.loadingFlag && this.state.searchTerm) {
          this.setState({
            loadingFlag: true,
            offset: this.state.offset + 25,
          });
          this.fetchGifs();
        }
      }
    }
  }

  newSearch(query, callback = null) {
    this.setState({
      searchTerm: query,
      offset: 0,
      lastResultsCount: -1
    }, () => {
      this.fetchGifs();

      if (callback) {
        callback();
      }
    });
  }

  fetchGifs() {
    // Don't pound the API if we didn't get any results.
    if (this.state.lastResultsCount !== 0) {
      let queryUrl = env.giphy_url;
      let queryPath = '/trending';
      let queryData = { api_key: env.giphy_api_key };

      if (this.state.searchTerm && this.state.searchTerm.length > 0) {
        queryPath = '/search';
        queryData = $.extend(queryData, {
          q: this.state.searchTerm,
          offset: this.state.offset
        });
      }
      queryData = $.param(queryData);
      queryUrl = `${queryUrl}${queryPath}?${queryData}`;

      $.ajax({
        method: 'GET',
        url: queryUrl,
        success: (gifs) => {
          let gifsArray = [];

          if (gifs.data.length === 0) {
            gifsArray = this.state.gifs;
          } else if (!this.state.searchTerm || this.state.offset === 0) {
            gifsArray = gifs.data;
          } else {
            gifsArray = this.state.gifs.concat(gifs.data);
          }

          this.setState({
            gifs: gifsArray,
            loadingFlag: false,
            lastResultsCount: gifs.data.length
          });
        }
      });
    }
  }

  clearSearch() {
    this.setState({ searchTerm: '' });
  }

  render() {
    return (
      <div className="search-box">
        <SearchForm
          newSearch={this.newSearch}
        />
        <div className="search-results" onScroll={this.handleScroll}>
          <SearchResults gifs={this.state.gifs} />
        </div>
      </div>
    );
  }
}

export default SearchBox;
