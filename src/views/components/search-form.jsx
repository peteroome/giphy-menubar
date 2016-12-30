import React from 'react';
import jQuery from 'jquery';
import env from './../../env';

const $ = jQuery;

// Analytics
const ReactGA = require('react-ga');

ReactGA.initialize(env.ga_ua_id);

class SearchForm extends React.Component {
  static scrollResultsToTop() {
    const $searchResults = $('.search-results')[0];

    if ($searchResults) {
      $('.search-results').animate({ scrollTop: 0 }, 100);
      return false;
    }
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.search.focus();
  }

  componentDidUpdate() {
    this.search.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newSearch(this.search.value, this.scrollResultsToTop);

    ReactGA.event({
      category: 'Form',
      action: 'Search',
      label: this.search.value
    });
  }

  render() {
    return (
      <div className="form-holder">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <input
              name="search"
              placeholder="Search"
              ref={(c) => { this.search = c; }}
            />
            <button type="submit">
              <img src="images/icons/ic_search_white_36px.svg" alt="Search" />
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  newSearch: React.PropTypes.func
};

export default SearchForm;
