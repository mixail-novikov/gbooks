import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LogoImage from '../../../../components/Logo';

import SearchForm from './SearchForm';
import OtherSearchServices from './OtherSearchServices';

import './style.css';

import {
  setFilterPanelVisibility as setFilterPanelVisibilityAction,
  isFilterPanelVisible as isFilterPanelVisibleSelector,
} from '../../../../redux/reducers/search';

class Header extends Component {
  static propTypes = {
    setFilterPanelVisibility: PropTypes.func,
    isFilterPanelVisible: PropTypes.bool,
  }

  static defaultProps = {
    setFilterPanelVisibility: () => {},
    isFilterPanelVisible: false,
  }

  handleToolsClick = () => {
    const { setFilterPanelVisibility, isFilterPanelVisible } = this.props;

    setFilterPanelVisibility(!isFilterPanelVisible);
  };

  render() {
    const { isFilterPanelVisible } = this.props;
    return (
      <div className="SearchHeader">
        <div className="SearchHeader__logo-holder">
          <LogoImage className="SearchHeader__logo" />
        </div>
        <div className="SearchHeader__content-holder">
          <SearchForm className="SearchHeader__form" />
          <div className="SearchHeader__rich-tools">
            <OtherSearchServices className="SearchHeader__other-services" />
            <div className="SearchHeader__tools">
              <button
                onClick={this.handleToolsClick}
              >
                { isFilterPanelVisible ? 'Hide' : 'Show' }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFilterPanelVisible: isFilterPanelVisibleSelector(state),
});

const mapDispatchToProps = {
  setFilterPanelVisibility: setFilterPanelVisibilityAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
