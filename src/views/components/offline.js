import React from 'react';

class Offline extends React.Component {
  render() {
    return(
      <div className="offline">
        <h1>No Internet Connection.</h1>

        <button onClick={this.props.tryAgain}>
          <img src="./src/images/icons/ic_refresh_white_36px.svg" alt="Refresh"/>
        </button>
      </div>
    );
  }
}

export default Offline;
