import "@poe-companion/translations"
import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react'
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { theme } from "@poe-companion/react-components"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
