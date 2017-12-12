import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setTerm, runSearch } from '../../../../redux/reducers/search';
import { selectSpeechPopup, closeSpeechPopup } from '../../../../redux/reducers/speech';
import SpeechRecognition from '../SpeechRecognition';

const SpeechRecognitionPopup = ({ visible, onRecognize, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <SpeechRecognition
      onClose={onClose}
      onRecognize={onRecognize}
    />
  );
};

SpeechRecognitionPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRecognize: PropTypes.func,
  onClose: PropTypes.func,
};

SpeechRecognitionPopup.defaultProps = {
  onRecognize: () => {},
  onClose: () => {},
};

export default connect(
  state => ({
    visible: selectSpeechPopup(state),
  }),
  dispatch => ({
    onRecognize: (value) => {
      dispatch(setTerm(value));
      dispatch(runSearch());
      dispatch(closeSpeechPopup());
    },
    onClose: () => dispatch(closeSpeechPopup()),
  }),
)(SpeechRecognitionPopup);
