import * as React from 'react';
import { theme } from './theme';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const AppStylesProvider: React.FC = ({ children }) => (
  <StylesProvider injectFirst>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>
);

export { AppStylesProvider };
