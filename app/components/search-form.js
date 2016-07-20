import React from 'react';

export default class SearchForm extends React.Component {
  constructor() {
    super();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this._handleSubmit}>
        <div className="search-form-fields">
          <input placeholder="Search:" ref={c => this._search = c} />
        </div>
        <div className="search-form-actions">
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.fetchGifs(this._search.value);
  }
}
