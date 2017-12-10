import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import LogoImage from '../../../../components/Logo';
import './style.css';

const Logo = ({ className }) => (
  <div className={c('Logo', className)}>
    <LogoImage className="Logo-image" />
    <div className="Logo-text">Books</div>
  </div>
);

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
