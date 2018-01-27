import React from 'react';
import styled from 'styled-components';

import Paragraph from './Paragraph';
import Link from './Link';

const StyledIntro = styled.div`
  font-size: 14px;
  text-align: center;
`;

const Intro = () => (
  <StyledIntro>
    <Paragraph>Search the world&amp;s most comprehensive index of full-text books.</Paragraph>
    <Link href="https://books.google.com/books">My library</Link>
  </StyledIntro>
);

export default Intro;
