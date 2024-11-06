import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20,
    },
  },
});

export const httpClient = axios.create({
  baseURL: 'http://localhost:5000',
});
