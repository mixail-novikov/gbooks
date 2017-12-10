import React from 'react';
import PropTypes from 'prop-types';

import logoPath from './logo.png';

const Logo = ({ className }) => (
  <img
    alt="Logo"
    className={className}
    src={logoPath}
  />
);

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
