import React, { Component } from 'react';

class RecognitionInvitation extends Component {
  state = {
    text: 'Speak now',
  };

  _mounted = true;

  componentDidMount() {
    setTimeout(() => {
      this._mounted && this.setState({
        text: 'Listening...',
      });
    }, 1500);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <div className="RecognitionInvitation">
        {this.state.text}
      </div>
    );
  }
}

export default RecognitionInvitation;
