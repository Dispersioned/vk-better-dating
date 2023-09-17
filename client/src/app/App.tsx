import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { theme } from 'shared/config/theme';

import { AuthProvider } from './providers/AuthProvider';
import { AppRouter } from './router/AppRouter';
import './styles/index.scss';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
