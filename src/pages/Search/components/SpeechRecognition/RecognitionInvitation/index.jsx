import React, { Component } from 'react';

/* eslint-disable no-underscore-dangle */
class RecognitionInvitation extends Component {
  state = {
    text: 'Speak now',
  };

  componentDidMount() {
    setTimeout(() => {
      if (this._mounted) {
        this.setState({
          text: 'Listening...',
        });
      }
    }, 1500);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _mounted = true;

  render() {
    return (
      <div className="RecognitionInvitation">
        {this.state.text}
      </div>
    );
  }
}

export default RecognitionInvitation;
