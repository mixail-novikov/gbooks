import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

export default class DropdownItem extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    registerChild: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.context.registerChild(this.props.value, this.props.children);
  }

  handleClick = () => {
    this.context.onSelect(this.props.value);
  };

  handleKeydown = (e) => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };

  render() {
    return (
      <div
        tabIndex="-1"
        role="menuitem"
        className={c({
        DropdownItem: true,
        DropdownItem_is_active: this.context.value === this.props.value,
      })}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
      >
        {this.props.children}
      </div>
    );
  }
}
