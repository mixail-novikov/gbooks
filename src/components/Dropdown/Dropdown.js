import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

export default class Dropdown extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node),
  };

  static defaultProps = {
    onChange: () => {},
    value: '',
    defaultValue: '',
    children: [],
  };

  static childContextTypes = {
    onSelect: PropTypes.func,
    value: PropTypes.string,
    registerChild: PropTypes.func,
  };

  state = {
    isOpened: false,
    childrenMap: {},
  }

  getChildContext() {
    return {
      onSelect: this.handleOnSelect,
      value: this.props.value,
      registerChild: this.registerChild,
    };
  }

  componentWillUnmount() {
    this.removeOutsideClickListener();
  }

  setRef = (ref) => { this.elemRef = ref; }

  registerChild = (key, value) => {
    this.setState(state => ({
      childrenMap: {
        ...state.childrenMap,
        [key]: value,
      },
    }));
  };

  handleOnSelect = (value) => {
    this.props.onChange(value);
    this.toggle();
  }

  handleClick = () => {
    this.toggle();
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.toggle();
    }
  }

  toggle() {
    this.setState((state) => {
      const isOpened = !state.isOpened;

      if (isOpened) {
        this.addOutsideClickListener();
      } else {
        this.removeOutsideClickListener();
      }

      return {
        isOpened,
      };
    });
  }

  handleOutsideClick = (e) => {
    const isClickInside = this.elemRef.contains(e.target);
    if (!isClickInside) {
      this.setState({
        isOpened: false,
      });
    }
  }

  addOutsideClickListener() {
    window.addEventListener('click', this.handleOutsideClick);
  }

  removeOutsideClickListener() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    const { isOpened, childrenMap } = this.state;
    const { value, defaultValue } = this.props;

    return (
      <div
        className={c({
          Dropdown: true,
          Dropdown_is_opened: isOpened,
        })}
        ref={this.setRef}
      >
        <div
          role="menu"
          tabIndex="-1"
          className={c({
          Dropdown__value: true,
          Dropdown__value_is_default: value === defaultValue,
        })}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >{childrenMap[value] || 'Select'}
        </div>
        <div className="Dropdown__items">{this.props.children}</div>
      </div>
    );
  }
}
