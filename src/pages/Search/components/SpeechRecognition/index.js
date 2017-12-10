import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './style.css';
import googleLogoPath from './google-logo.png';
import MicrophoneButton from './MicrophoneButton';
import RecognitionInvitation from './RecognitionInvitation';
import RecognitionResult from './RecognitionResult';

const SpeechRecognitionAPI = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition;
export const isSpeechRecognitionAvailable = !!SpeechRecognitionAPI;

/* eslint-disable no-underscore-dangle */
class SpeechRecognition extends Component {
  static propTypes = {
    onRecognize: PropTypes.func,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    onRecognize: () => {},
    onClose: () => {},
  }

  constructor() {
    super();
    this.initSpeechRecognition();
  }

  state = {
    result: '',
    isFinish: false,
  };

  componentDidMount() {
    this.recognition.start();
  }

  componentWillUnmount() {
    this._mounted = false;
    this.recognition.abort();
  }

  _mounted = true;

  handleMicrophoneClick = () => {
    try {
      this.recognition.start();
    } catch (e) {
      console.log(JSON.stringify(e)); // eslint-disable-line
    }
  };

  initSpeechRecognition() {
    if (!isSpeechRecognitionAvailable) {
      return;
    }

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 5;

    this.recognition.onspeechstart = () => {
      // speech animation start
    };

    this.recognition.onspeechend = () => {
      // speech animation stop
    };

    this.recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const isFinish = event.results[0].isFinal;

      if (this._mounted) {
        this.setState({
          result,
          isFinish,
          noMatch: false,
        });
      }

      if (isFinish) {
        this.props.onRecognize(result);
      }
    };

    this.recognition.onend = () => {
      if (!this.state.result && this._mounted) {
        this.setState({
          noMatch: true,
        });
      }
    };

    this.recognition.onstart = () => {
      if (this._mounted) {
        this.setState({
          noMatch: false,
          result: '',
        });
      }
    };

    this.recognition.onnomatch = () => {
      if (this._mounted) {
        this.setState({
          noMatch: true,
        });
      }
    };
  }

  render() {
    const { onClose } = this.props;
    const { result, isFinish, noMatch } = this.state;

    return (
      <div className="SpeechRecognition">
        <div className="SpeechRecognition__content">
          <span className="SpeechRecognition__content-item SpeechRecognition__text">
            {
              result
              ? <RecognitionResult result={result} isFinish={isFinish} />
              : !noMatch && <RecognitionInvitation />
            }
            { noMatch && <div>Didn&apos;t get that. Try again.</div>}
          </span>
          <MicrophoneButton
            className="SpeechRecognition__content-item SpeechRecognition__microphone"
            onClick={this.handleMicrophoneClick}
          />
          <img
            alt="Google Logo"
            className="SpeechRecognition__content-item SpeechRecognition__google-logo"
            src={googleLogoPath}
          />
        </div>
        <button className="SpeechRecognition__close" onClick={onClose}>×</button>
      </div>
    );
  }
}

export default SpeechRecognition;
