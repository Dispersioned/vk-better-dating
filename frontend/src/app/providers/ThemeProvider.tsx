import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { theme } from 'shared/config/theme';

type ThemeProviderProps = PropsWithChildren;

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
