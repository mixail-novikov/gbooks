import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import c from 'classnames';

import './style.css';

export class Dropdown extends Component {
  state = {
    isOpened: false,
    childrenMap: {},
  }

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    valueText: PropTypes.string,
    defaultValue: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
  };

  static childContextTypes = {
    onSelect: PropTypes.func,
    value: PropTypes.string,
    registerChild: PropTypes.func,
  };

  getChildContext() {
    return {
      onSelect: this.handleOnSelect,
      value: this.props.value,
      registerChild: this.registerChild,
    }
  }

  registerChild = (key, value) => {
    this.setState((state) => ({
      childrenMap: {
        ...state.childrenMap,
        [key]: value
      }
    }));
  };

  handleOnSelect = (value) => {
    this.props.onChange(value);
    this.toggle();
  }

  handleClick = () => {
    this.toggle();
  }

  toggle() {
    this.setState((state) => ({
      isOpened: !state.isOpened,
    }));
  }

  render() {
    const { isOpened, childrenMap } = this.state;
    const { value, valueText, defaultValue } = this.props;

    return (
      <div className={c({
        "Dropdown": true,
        "Dropdown_is_opened": isOpened,
      })}>
        <div className={c({
          "Dropdown__value": true,
          "Dropdown__value_is_default": value === defaultValue,
        })} onClick={this.handleClick}>{childrenMap[value]}</div>
        <div className="Dropdown__items">{this.props.children}</div>
      </div>
    );
  }
}

export class DropdownItem extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  static contextTypes = {
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    registerChild: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.context.registerChild(this.props.value, this.props.children);
  }

  render() {
    return (
      <div className={c({
        "DropdownItem": true,
        "DropdownItem_is_active": this.context.value === this.props.value,
      })} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }

  handleClick = () => {
    this.context.onSelect(this.props.value);
  }
}
