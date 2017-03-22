import React from 'react';
import { HotKeys } from 'react-hotkeys';
import Analytics from 'electron-google-analytics';
import env from './../../env';

const electron = window.require('electron');
const remote = electron.remote;
const clipboard = remote.clipboard;
const analytics = new Analytics(env.ga_ua_id, {
  userAgent: 'com.peteroome.gif-bar',
  debug: env.ga_debug
});

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.search.focus();
  }

  componentDidUpdate() {
    this.search.focus();
  }

  selectAll(event) {
    event.target.select();
  }

  paste(event) {
    event.preventDefault();
    const searchInput = event.target;
    searchInput.value = clipboard.readText();
  }

  copy(event) {
    event.preventDefault();
    clipboard.writeText(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newSearch(this.search.value);

    analytics.event('Form', 'Search', {
      evLabel: this.search.value
    });
  }

  render() {
    const keyboardShortcuthandlers = {
      selectAll: this.selectAll,
      paste: this.paste,
      copy: this.copy
    };

    return (
      <HotKeys handlers={keyboardShortcuthandlers}>
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
      </HotKeys>
    );
  }
}

SearchForm.propTypes = {
  newSearch: React.PropTypes.func
};

export default SearchForm;
