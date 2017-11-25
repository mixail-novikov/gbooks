import React, { Component } from 'react';

class RecognitionInvitation extends Component {
  state = {
    text: 'Speak now'
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Listening...',
      })
    }, 1500);
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
