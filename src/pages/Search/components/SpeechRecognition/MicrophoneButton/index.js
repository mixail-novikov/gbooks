import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import c from 'classnames';

import './style.css';
import MicrophoneIcon from './MicrophoneIcon';

class MicrophoneButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    isSpeechInProgress: PropTypes.bool,
  }

  render() {
    const { className, onClick } = this.props;

    return (
      <div className={c('MicrophoneButton', className)}>
        <button className="MicrophoneButton__button" onClick={onClick}>
          <MicrophoneIcon className="MicrophoneButton__icon" />
        </button>
        {/* <div className="MicrophoneButton__active_indicator" /> */}
      </div>
    );
  }
}

export default MicrophoneButton;
