import React from 'react';
import ReactDom from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

import SearchForm from './search-form';
import Footer from './footer';
import Gif from './gif';

export default class SearchBox extends React.Component {

  constructor() {
    super();

    this.state = {
      gifs: [],
      loadingFlag: false,
      offset: 0,
      searchTerm: ''
    };

    this._setSearchTerm = this._setSearchTerm.bind(this);
    this._fetchGifs = this._fetchGifs.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._clearSearch = this._clearSearch.bind(this);

    window.addEventListener("scroll", this._handleScroll);
  }

  componentWillMount() {
    this._fetchGifs();
  }

  render() {
    const gifs = this._getGifs();

    return(
      <div className="gifs-container">
        <div className="fixed-content">
          <SearchForm
            onUpdate={this._setSearchTerm}
            currentSearchTerm={this.state.searchTerm}
            fetchGifs={this._fetchGifs} />
          <Footer fetchGifs={this._fetchGifs} clearSearch={this._clearSearch} />
        </div>
        <div className="gif-list-container">
          <ul className="gif-list">
            {gifs}
          </ul>
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

  _setSearchTerm(query) {
    this.setState({
      searchTerm: query
    });
  }

  _fetchGifs(query) {
    this.setState({
      searchTerm: query
    }, () => {
      let queryUrl = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

      if(query && query.length > 0) {
        queryUrl = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchTerm}&offset=${this.state.offset}&api_key=dc6zaTOxFJmzC`;
      }

      jQuery.ajax({
        method: 'GET',
        url: queryUrl,
        success: (gifs) => {
          let gifsArray = [];

          if (gifs.data.length == 0) {
            gifsArray = this.state.gifs;
          } else if (this.state.offset === 0) {
            gifsArray = gifs.data;
          } else {
            gifsArray = this.state.gifs.concat(gifs.data);
          }

          this.setState({
            gifs: gifsArray,
            loadingFlag: false,
          })
        }
      });
    });
  }

  _handleScroll() {
    // this function will be triggered if user scrolls
    var windowHeight = $("body").height();
    var inHeight = window.innerHeight;
    var scrollT = $("body").scrollTop();
    var totalScrolled = scrollT + inHeight;

    if(totalScrolled + 100 > windowHeight){ //user reached at bottom
      if(!this.state.loadingFlag && this.state.searchTerm){ //to avoid multiple request
        this.setState({
          loadingFlag: true,
          offset: this.state.offset + 25,
        });
        this._fetchGifs(this.state.searchTerm);
      }
    }
  }

  _clearSearch() {
    this.setState({
      searchTerm: ''
    });
  }
}
