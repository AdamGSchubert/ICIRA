import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#ab1a1a',
      
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#45b08d',
      dark: '#2b6e58',
      light: '#2b6e58',
    },
    secondary: {
      main: '#3f6deb',
    },
    background: {
      default: '#d1dad1',
      paper: '#d8ede4',
    },
    error: {
      main: '#f74040',
    },
    warning: {
      main: '#f7754a',
    },
  },
});