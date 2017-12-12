import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LogoImage from '../../../../components/Logo';

import SearchForm from './SearchForm';
import OtherSearchServices from './OtherSearchServices';

import './style.css';

import {
  setFilterPanelVisibility,
  selectFilterPanelVisibility,
} from '../../../../redux/reducers/filterPanel';

class Header extends Component {
  static propTypes = {
    onToggleFilterPanel: PropTypes.func,
    isFilterPanelVisible: PropTypes.bool,
  }

  static defaultProps = {
    onToggleFilterPanel: () => {},
    isFilterPanelVisible: false,
  }

  handleToolsClick = () => {
    const { onToggleFilterPanel, isFilterPanelVisible } = this.props;

    onToggleFilterPanel(!isFilterPanelVisible);
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
  isFilterPanelVisible: selectFilterPanelVisibility(state),
});

const mapDispatchToProps = {
  onToggleFilterPanel: setFilterPanelVisibility,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
