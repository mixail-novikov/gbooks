import React from 'react';
import styled from 'styled-components';

import LogoImage from './LogoImage';
import LogoText from './LogoText';

const Logo = () => (
  <div>
    <LogoImage />
    <LogoText>Books</LogoText>
  </div>
);

const StyledLogo = styled(Logo)`
  position: relative;
  margin-bottom: 23px;
`;

export default StyledLogo;
