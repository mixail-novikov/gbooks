import React from 'react';
import * as PropTypes from 'prop-types';
import c from 'classnames';

import './style.css';
import MicrophoneIcon from './MicrophoneIcon';

const MicrophoneButton = ({ onClick, className }) => (
  <div className={c('MicrophoneButton', className)}>
    <button className="MicrophoneButton__button" onClick={onClick}>
      <MicrophoneIcon className="MicrophoneButton__icon" />
    </button>
  </div>
);

MicrophoneButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

MicrophoneButton.defaultProps = {
  onClick: () => {},
  className: '',
};

export default MicrophoneButton;
