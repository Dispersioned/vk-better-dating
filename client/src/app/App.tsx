import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import { Home } from 'pages/home';
import { theme } from 'shared/config/theme';

import './styles/index.scss';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Home />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
