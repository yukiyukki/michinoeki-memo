import * as React from 'react';
import { theme } from './theme';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';

const AppStylesProvider: React.FC = ({ children }) => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StylesProvider>
);

export { AppStylesProvider };
