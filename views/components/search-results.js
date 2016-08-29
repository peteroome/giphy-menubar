import React from 'react';

export default class SearchResults extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount(){
  //   document.getElementById("search-box").scrollTop = 0;
  // }

  render() {
    let oddGifs  = [];
    let evenGifs = [];

    this.props.gifs.filter((gif, index) => {
      if(index % 2 === 0){
        evenGifs.push(gif);
      } else {
        oddGifs.push(gif);
      }
    });

    return(
      <div className="gif-list-container">
        <ul className='gif-list left'>{oddGifs}</ul>
        <ul className='gif-list right'>{evenGifs}</ul>
      </div>
    )
  }
}
