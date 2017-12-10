import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogoImage from '../../../../components/Logo';

import SearchForm from './SearchForm';
import OtherSearchServices from './OtherSearchServices';

import './style.css';

import { setFilterPanelVisibility, isFilterPanelVisible } from '../../../../redux/reducers/search';

class Header extends Component {
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
              <button onClick={this.handleToolsClick}>toggle</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleToolsClick = () => {
    const { setFilterPanelVisibility, isFilterPanelVisible } = this.props;

    setFilterPanelVisibility(!isFilterPanelVisible);
  };
}

const mapStateToProps = state => ({
  isFilterPanelVisible: isFilterPanelVisible(state),
});

const mapDispatchToProps = {
  setFilterPanelVisibility,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
