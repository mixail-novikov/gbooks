import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        Search page
        <Link to='/'>Main page</Link>
      </div>
    );
  }
}

export default Search;
