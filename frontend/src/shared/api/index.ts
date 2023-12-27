import axios from 'axios';

export * from './server';
export * from './queryClient';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});
