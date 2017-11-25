import React, { Component } from 'react';

import './style.css';
import googleLogoPath from './google-logo.png';
import MicrophoneButton from './MicrophoneButton';

class SpeechRecognition extends Component {
  render() {
    return (
      <div className="SpeechRecognition">
        <div className="SpeechRecognition__content">
          <span className="SpeechRecognition__content-item SpeechRecognition__text">
            Listening...
          </span>
          <MicrophoneButton
            className="SpeechRecognition__content-item SpeechRecognition__microphone"
            onClick={this.handleMicrophoneClick}
          />
          <img
            className="SpeechRecognition__content-item SpeechRecognition__google-logo"
            src={googleLogoPath}
          />
        </div>
        <button className="SpeechRecognition__close">×</button>
      </div>
    );
  }

  handleMicrophoneClick = () => {
    console.log('start recognition');
  };
}

export default SpeechRecognition;
