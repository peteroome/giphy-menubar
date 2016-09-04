import React from 'react';
import SearchBox from './search-box';
import Offline from './offline';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.isOnline = this.isOnline.bind(this);
  }

	render() {
    let ui = this.isOnline();
    return(ui);
  }

  isOnline() {
    if (navigator.onLine) {
      return(
        <SearchBox />
      );
    } else {
      return(
        <Offline />
      );
    }
  }
}
