import "@poe-companion/translations"
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { GlobalStyles, mui_theme, theme } from "@poe-companion/react-components"

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <MuiThemeProvider theme={mui_theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  </StrictMode>
);
