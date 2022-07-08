import * as React from 'react';
import { theme } from './theme';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';

const AppStylesProvider: React.FC = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <SCThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </SCThemeProvider>
  </StyledEngineProvider>
);

export { AppStylesProvider };
