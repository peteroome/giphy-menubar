import React from 'react';
import SearchBox from './search-box';
import Offline from './offline';

export default class App extends React.Component {
  constructor() {
    super();

    this._isOnline = this._isOnline.bind(this);
  }

	render() {
    let ui = this._isOnline();
    return(ui);
  }

  _isOnline() {
    if (navigator.onLine) {
      return(
        <SearchBox ref="searchBox" />
      );
    } else {
      return(
        <Offline />
      );
    }
  }
}

export default App;
