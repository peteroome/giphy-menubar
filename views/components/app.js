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
    let appComponent;
    if (this.isOnline()) {
      appComponent = <SearchBox />;
    } else {
      appComponent = <Offline tryAgain={this.checkOnline} />
    }

    return(
      <div className="app">
        {appComponent}
        <Footer />
      </div>
    );
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
