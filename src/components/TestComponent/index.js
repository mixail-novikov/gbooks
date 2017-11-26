import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { testAction } from '../../redux/reducers/searchQuery';
import { setSearchFilter, setSorting, setPrintType } from '../../redux/reducers/newSearch';

class TestComponent extends Component {
  _input;

  componentDidMount() {
    const { setSearchFilter, setSorting, setPrintType } = this.props;
    window.setSearchFilter = setSearchFilter;
    window.setSorting = setSorting;
    window.setPrintType = setPrintType;
  }

  handleButtonClick = () => {
    const value = this._input.value;
    this.props.testAction(value);
    console.log(value);
  };

  setInputRef = (ref) => {
    this._input = ref;
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.setInputRef} />
        <button onClick={this.handleButtonClick}>Click</button>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  {
    testAction,
    setSearchFilter,
    setSorting,
    setPrintType,
  }
)(TestComponent));
