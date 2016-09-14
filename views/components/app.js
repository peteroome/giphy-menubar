import React from 'react';
import SearchBox from './search-box';
import Offline from './offline';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isOnline = this.isOnline.bind(this);
    this.checkOnline = this.checkOnline.bind(this);
  }

	render() {
    if (this.isOnline()) {
      return(
        <SearchBox />
      );
    } else {
      return(
        <Offline
          tryAgain={this.checkOnline}
        />
      );
    }
  }

  isOnline() {
    return navigator.onLine ? true : false;
  }

  checkOnline(event) {
    event.preventDefault();
    this.forceUpdate();
  }
}

export default App;
