import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from 'shared/config/theme';

import { AuthProvider } from './providers/AuthProvider';
import { TanstackQueryProvider } from './providers/TanstackQueryProvider';
import { AppRouter } from './router/AppRouter';
import './styles/index.scss';

export function App() {
  return (
    <TanstackQueryProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
            <ToastContainer newestOnTop limit={4} />
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TanstackQueryProvider>
  );
}
