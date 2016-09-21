import React from 'react';
import SearchBox from './search-box';
import Offline from './offline';
import Footer from './footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isOnline = this.isOnline.bind(this);
    this.checkOnline = this.checkOnline.bind(this);
  }

	render() {
    if (this.isOnline()) {
      return(
        <div className="app">
          <SearchBox />
          <Footer />
        </div>
      );
    } else {
      return(
        <div className="app">
          <Offline tryAgain={this.checkOnline} />
          <Footer />
        </div>
      );
    }
  }

  isOnline() {
    let onlineOrNot = navigator.onLine ? true : false;
    heap.track('menubar:checkOnline', {
      isOnline: onlineOrNot
    });
    return onlineOrNot;
  }

  checkOnline(event) {
    event.preventDefault();
    heap.track('menubar:checkOnline');
    this.forceUpdate();
  }
}

export default App;
