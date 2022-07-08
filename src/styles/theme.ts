import { createTheme, adaptV4Theme } from '@mui/material/styles';

export const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        light: '#d7ffd9',
        main: '#109a1d',
        dark: '#75a478',
        contrastText: '#000000',
      },
    },
  }),
);
