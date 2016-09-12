import React from 'react';
import ReactDom from 'react-dom';
import jQuery from 'jquery';
const $ = jQuery;

export default class SearchForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let value = this.props.currentSearchTerm || ""

    return (
      <div className="form-holder">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <input
              name="search"
              placeholder="Search"
              value={value}
              ref={(c) => this.search = c}
              onChange={this.handleChange} />
            <button type="submit">
              <img src="public/assets/images/icons/ic_search_black_36px.svg" alt="Search"/>
            </button>
          </fieldset>
        </form>
      </div>
    );
  }

  componentDidMount(){
    this.search.focus();
  }

  componentDidUpdate(){
    this.search.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newSearch(this.search.value);
  }

  handleChange(event) {
    let query = event.target.value;
    this.props.onUpdate(query);
  }
}
