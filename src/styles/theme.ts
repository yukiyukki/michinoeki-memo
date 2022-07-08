import { createTheme } from '@mui/material/styles';

const MuiDefaultTheme = createTheme();

export const theme = createTheme({
  ...MuiDefaultTheme,
  palette: {
    ...MuiDefaultTheme.palette,
    primary: {
      light: '#d7ffd9',
      main: '#109a1d',
      dark: '#75a478',
      contrastText: '#000000',
    },
  },
});
