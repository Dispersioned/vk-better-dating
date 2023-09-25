import axios from 'axios';

export * from './server';
export * from './tanstackQuery';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});
