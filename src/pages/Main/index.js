import React from 'react';
import styled from 'styled-components';

import SearchForm from './SearchForm';
import Logo from './Logo';
import Intro from './Intro';

const MainPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 180px;
`;

const Main = () => (
  <MainPage>
    <Logo />
    <SearchForm />
    <Intro />
  </MainPage>
);

export default Main;
