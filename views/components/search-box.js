import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

import SearchForm from './search-form';
import Footer from './footer';
import SearchResults from './search-results';
import Gif from './gif';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      loadingFlag: false,
      offset: 0,
      searchTerm: ''
    };

    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.fetchGifs = this.fetchGifs.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleScroll(event) {
    var searchBox = event.currentTarget;
    // var searchBox = document.getElementsByClassName('search-box')[0];
    var windowHeight = searchBox.offsetHeight;
    var scrollTop = searchBox.scrollTop;
    var inHeight = window.innerHeight;
    var totalScrolled = scrollTop + inHeight;
    console.log(windowHeight, scrollTop, inHeight, totalScrolled);

    if(totalScrolled + 100 > windowHeight){ //user reached at bottom
      if(!this.state.loadingFlag && this.state.searchTerm){ //to avoid multiple request
        this.setState({
          loadingFlag: true,
          offset: this.state.offset + 25,
        });
        this.fetchGifs();
      }
    }
  }

  componentWillMount() {
    this.fetchGifs();
  }

  render() {
    let gifs = this.getGifs();

    return(
      <div className="search-box" onScroll={this.handleScroll}>
        <div className='fixed-content'>
          <SearchForm
            onUpdate={this.setSearchTerm}
            currentSearchTerm={this.state.searchTerm}
            newSearch={this.newSearch}
          />
          <Footer fetchGifs={this.fetchGifs} clearSearch={this.clearSearch} />
        </div>
        <SearchResults gifs={gifs} />
      </div>
    );
  }

  getGifs() {
    return this.state.gifs.map((gif) => {
      return <Gif
               {...gif}
               key={gif.id} />
    });
  }

  setSearchTerm(query) {
    this.setState({
      searchTerm: query
    });
  }

  newSearch(query) {
    this.setState({
      searchTerm: query,
      offset: 0
    }, () => {
      this.fetchGifs();
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
