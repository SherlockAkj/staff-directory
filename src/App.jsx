import React from 'react';
import Home from './pages/Home';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f7f7f7;
    color: #333;
  }
  h1, h2, h3 {
    margin: 0 0 10px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;
