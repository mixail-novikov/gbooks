import React from 'react';
import styled from 'styled-components';

import searchIcon from './search.png';

const Button = props => (
  <button {...props}>
    <img src={searchIcon} alt="Search" />
  </button>
);

const StyledButton = styled(Button)`
  border: 1px solid #3079ed;
  border-radius: 2px;
  height: 29px;
  background-color: #357ae8;
  background-image: linear-gradient(to bottom, #4d90fe, #357ae8);
  outline: none;
  width: 72px;
  margin-left: 10px;

  > img
    vertical-align: middle;
    margin-bottom: 1px;
`;

export default StyledButton;
