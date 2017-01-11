import React from 'react';
import { HotKeys } from 'react-hotkeys';
import SearchBox from './search-box';
import Offline from './offline';
import Footer from './footer';

const map = {
  selectAll: 'command+a',
  paste: 'command+v',
  copy: 'command+c'
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isOnline = this.isOnline.bind(this);
    this.checkOnline = this.checkOnline.bind(this);
  }

  isOnline() {
    return this.navigator.onLine;
  }

  checkOnline(event) {
    event.preventDefault();
    this.forceUpdate();
  }

  render() {
    let appComponent;
    if (navigator.onLine) {
      appComponent = <SearchBox />;
    } else {
      appComponent = <Offline tryAgain={this.checkOnline} />;
    }

    return (
      <HotKeys keyMap={map}>
        <div className="app">
          {appComponent}
          <Footer />
        </div>
      </HotKeys>
    );
  }
}

export default App;
