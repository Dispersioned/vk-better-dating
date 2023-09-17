import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from 'shared/config/theme';

import { AuthProvider } from './providers/AuthProvider';
import { AppRouter } from './router/AppRouter';
import './styles/index.scss';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <AuthProvider>
            <AppRouter />
            <ToastContainer newestOnTop limit={4} />
          </AuthProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
