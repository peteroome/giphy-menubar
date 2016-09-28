import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

import SearchForm from './search-form';
import Footer from './footer';
import SearchResults from './search-results';

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

  handleScroll(event) {
    var searchResults = event.currentTarget;
    var windowHeight = searchResults.offsetHeight;
    var $contentHolder = $("ul", searchResults)[0];

    if($contentHolder){
      var bottomOfContent = $contentHolder.offsetHeight;
      var scrollTop = searchResults.scrollTop;
      var searchResultsHeight = searchResults.offsetHeight;
      var totalScrolled = scrollTop + searchResultsHeight;

      if(totalScrolled >= bottomOfContent){ //user reached at bottom
        if(!this.state.loadingFlag && this.state.searchTerm){ //to avoid multiple requests
          this.setState({
            loadingFlag: true,
            offset: this.state.offset + 25,
          });
          this.fetchGifs();
        }
      }
    }
  }

  componentWillMount() {
    this.fetchGifs();
  }

  render() {
    return(
      <div className="search-box">
        <SearchForm
          currentSearchTerm={this.state.searchTerm}
          newSearch={this.newSearch}
        />
      <div className="search-results" onScroll={this.handleScroll}>
          <SearchResults gifs={this.state.gifs} />
        </div>
      </div>
    );
  }

  newSearch(query, callback = null) {
    this.setState({
      searchTerm: query,
      offset: 0,
      lastResultsCount: -1
    }, () => {
      this.fetchGifs();

      if (callback){
        callback();
      }
    });
  }

  fetchGifs() {
    // Don't pound the API if we didn't get any results.
    if(this.state.lastResultsCount !== 0){
      let queryUrl = process.env.GIPHY_URL
      let queryPath = '/trending'
      let queryData = { 'api_key': process.env.GIPHY_API_KEY }

      if(this.state.searchTerm && this.state.searchTerm.length > 0) {
        queryPath = `/search`;
        queryData = $.extend(queryData, {
          'q': this.state.searchTerm,
          'offset': this.state.offset
        });
      }
      queryData = $.param(queryData);
      queryUrl = queryUrl + queryPath + "?" + queryData

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
          })
        }
      });
    }
  }

  clearSearch() {
    this.setState({ searchTerm: '' });
  }
}

export default SearchBox;
