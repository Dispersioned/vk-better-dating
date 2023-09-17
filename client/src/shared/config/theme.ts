import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    allVariants: {
      color: '#fff',
    },
    body1: {
      fontSize: 20,
    },
    h4: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
          padding: '7px 20px',
        },
      },
    },
  },
});
