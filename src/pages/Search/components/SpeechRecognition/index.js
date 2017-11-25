import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';
import googleLogoPath from './google-logo.png';
import MicrophoneButton from './MicrophoneButton';
import RecognitionInvitation from './RecognitionInvitation';
import RecognitionResult from './RecognitionResult';

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
export const isSpeechRecognitionAvailable = !!SpeechRecognitionAPI;

class SpeechRecognition extends Component {
  state = {
    speechInProgress: false,
    result: '',
    isFinish: false,
  };
  _mounted = true;

  static propTypes = {
    onRecognize: PropTypes.func,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool,
  }

  static defaultProps = {
    onRecognize: () => {console.log('onRecognize callback default handler')},
    onClose: () => {console.log('onClose callback default handler');}
  }

  constructor() {
    super();
    this.initSpeechRecognition();
  }

  componentDidMount() {
    this.recognition.start();
  }

  componentWillUnmount() {
    this._mounted = false;
    this.recognition.abort();
  }

  render() {
    const { onClose } = this.props;
    const { result, isFinish, noMatch } = this.state;

    return (
      <div className="SpeechRecognition">
        <div className="SpeechRecognition__content">
          <span className="SpeechRecognition__content-item SpeechRecognition__text">
            {
              !!result
              ? <RecognitionResult result={result} isFinish={isFinish} />
              : !noMatch && <RecognitionInvitation />
            }
            { noMatch && <div>Didn't get that. Try again.</div>}
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
        <button className="SpeechRecognition__close" onClick={onClose}>×</button>
      </div>
    );
  }

  initSpeechRecognition() {
    if (!isSpeechRecognitionAvailable) {
      return;
    }

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 5;

    this.recognition.onspeechstart = () => {
      this._mounted && this.setState({
        speechInProgress: true,
      })
    }

    this.recognition.onspeechend = () => {
      this._mounted && this.setState({
        speechInProgress: false,
      })
    }

    this.recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const isFinish = event.results[0].isFinal;

      this._mounted && this.setState({
        result,
        isFinish,
        noMatch: false,
      });

      if (isFinish) {
        this.props.onRecognize(result);
      }
    };

    this.recognition.onend = () => {
      if (!this.state.result && this._mounted) {
        this.setState({
          noMatch: true,
        })
      }
    };

    this.recognition.onstart = () => {
      this._mounted && this.setState({
        noMatch: false,
        result: '',
      })
    };

    this.recognition.onnomatch = () => {
      this._mounted && this.setState({
        noMatch: true,
      })
    };
  }

  handleMicrophoneClick = () => {
    try {
      this.recognition.start();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };
}

export default SpeechRecognition;
