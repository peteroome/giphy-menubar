import React from 'react';
import jQuery from 'jquery';

const $ = jQuery;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollResultsToTop = this.scrollResultsToTop.bind(this);
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
  }

  scrollResultsToTop() {
    const $searchResults = $('.search-results')[0];

    if ($searchResults) {
      $('.search-results').animate({ scrollTop: 0 }, 100);
      return false;
    }
  }

  render() {
    return (
      <div className="form-holder">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <input
              name="search"
              placeholder="Search"
              ref={(c) => this.search = c}
            />
            <button type="submit">
              <img src="./src/images/icons/ic_search_white_36px.svg" alt="Search" />
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
