import React, { Component } from 'react';
import logoPath from './logo.png';

export default ({className}) => (
  <img className={className} src={logoPath} />
);