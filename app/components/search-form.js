import React from 'react';

export default class SearchForm extends React.Component {
  constructor() {
    super();

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    let value = this.props.currentSearchTerm || ""

    return (
      <div className="form-holder">
        <form className="search-form" onSubmit={this._handleSubmit}>
          <fieldset>
            <input
              name="search"
              placeholder="Search"
              value={value}
              ref={(c) => this._search = c}
              onChange={this._handleChange} />
            <button type="submit">
              <img src="public/assets/images/icons/ic_search_black_36px.svg" alt="Search"/>
            </button>
          </fieldset>
        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.fetchGifs(this._search.value);
  }

  _handleChange(event) {
    let query = event.target.value;
    this.props.onUpdate(query);
  }
}