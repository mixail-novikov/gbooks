import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setTerm, runSearch } from '../../../../redux/reducers/search';
import { selectSpeechPopup, closeSpeechPopup } from '../../../../redux/reducers/speech';
import SpeechRecognition from '../SpeechRecognition';

class SpeechRecognitionPopup extends Component {
  render() {
    const {isVisible, onRecognize, onClose } = this.props;

    if (!isVisible) {
      return null;
    }

    return <SpeechRecognition onClose={onClose} onRecognize={onRecognize} />
  }
}

export default connect(
  (state) => ({
    isVisible: selectSpeechPopup(state),
  }),
  (dispatch) => ({
    onRecognize: (value) => {
      dispatch(setTerm(value));
      dispatch(runSearch());
      dispatch(closeSpeechPopup());
    },
    onClose: () => dispatch(closeSpeechPopup()),
  })
)(SpeechRecognitionPopup);
