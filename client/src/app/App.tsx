import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { theme } from 'shared/config/theme';

import { AppRouter } from './router/AppRouter';
import './styles/index.scss';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <AppRouter />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
