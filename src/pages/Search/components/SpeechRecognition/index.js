import React, { Component } from 'react';

import './style.css';
import googleLogoPath from './google-logo.png';
import MicrophoneIcon from './MicrophoneIcon';

class SpeechRecognition extends Component {
  render() {
    return (
      <div className="SpeechRecognition">
        <div className="SpeechRecognition__content">
          <span className="SpeechRecognition__content-item SpeechRecognition__text">
            Listening...
          </span>
          <button className="SpeechRecognition__content-item SpeechRecognition__microphone SpeechRecognition__microphone_active">
            <MicrophoneIcon className="SpeechRecognition__microphone-icon" />
          </button>
          <img
            className="SpeechRecognition__content-item SpeechRecognition__google-logo"
            src={googleLogoPath}
          />
        </div>
        <button className="SpeechRecognition__close">×</button>
      </div>
    );
  }
}

export default SpeechRecognition;
