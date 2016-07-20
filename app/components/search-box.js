import React from 'react';
import ReactDom from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

import SearchForm from './search-form';
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

    this._fetchGifs = this._fetchGifs.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    window.addEventListener("scroll", this._handleScroll);
  }

  _handleScroll() {
    // this function will be triggered if user scrolls
    var windowHeight = $("body").height();
    var inHeight = window.innerHeight;
    var scrollT = $("body").scrollTop();
    var totalScrolled = scrollT + inHeight;

    if(totalScrolled + 100 > windowHeight){ //user reached at bottom
      console.log(windowHeight, inHeight, scrollT, totalScrolled);
      if(!this.state.loadingFlag && this.state.searchTerm){ //to avoid multiple request
        this.setState({
          loadingFlag: true,
          offset: this.state.offset + 25,
        });
        this._fetchGifs(this.state.searchTerm);
      }
    }
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
    this.setState({
      searchTerm: searchTerm,
    });

    let queryUrl = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    if(searchTerm && searchTerm.length > 0) {
      queryUrl = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchTerm}&offset=${this.state.offset}&api_key=dc6zaTOxFJmzC`;
    }
    console.log(queryUrl);

    jQuery.ajax({
      method: 'GET',
      url: queryUrl,
      success: (gifs) => {
        this.setState({
          gifs: this.state.gifs.concat(gifs.data),
          loadingFlag: false,
        })
      }
    });
  }

}
