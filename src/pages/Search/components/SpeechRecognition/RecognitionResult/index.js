import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

import './style.css';

let prevInputString;
function calcParts(inputString, isFinish) {
  if (isFinish) {
    return [inputString]
  }

  if (!prevInputString) {
    prevInputString = inputString;
    return ['', inputString]
  }

  let i = 0;
  let commonPart = '';
  while (inputString[i] === prevInputString[i]) {
    commonPart += inputString[i];
    i+=1;
  }
  let restPart = inputString.substr(i);
  prevInputString = inputString;

  return [commonPart, restPart];
}

class RecognitionResult extends PureComponent {
  static propTypes = {
    result: PropTypes.string,
    isFinish: PropTypes.bool,
  };

  render() {
    const { isFinish, result } = this.props;
    const [commonPart, restPart] = calcParts(result, isFinish);

    return (
      <div className="RecognitionResult">
        {commonPart && <span className="RecognitionResult__part RecognitionResult__part_common">{ commonPart }</span>}
        {restPart && <span className="RecognitionResult__part RecognitionResult__part_rest">{ restPart }</span>}
      </div>
    );
  }
}

export default RecognitionResult;
