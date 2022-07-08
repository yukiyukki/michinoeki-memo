import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import { theme } from './theme';

const AppStylesProvider: React.FC = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </StyledEngineProvider>
);

export { AppStylesProvider };
