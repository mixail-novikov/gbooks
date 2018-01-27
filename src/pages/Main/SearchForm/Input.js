import styled from 'styled-components';

const Input = styled.input`
  height: 29px;
  font-size: 17px;
  border-radius: 1px;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  padding: 1px 7px;
  outline: none;

  &:focus {
    border-color: #d9d9d9;
    box-shadow: none;
  }

  &:hover {
    border-color: #a0a0a0;
  }
`;

export default Input;
