import * as React from 'react';
import { theme } from './theme';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';

const AppStylesProvider: React.FC = ({ children }) => (
  <StylesProvider injectFirst>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>
);

export { AppStylesProvider };
