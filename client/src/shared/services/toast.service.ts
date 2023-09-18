import { toast } from 'react-toastify';

export const toastService = {
  success: (text: string) => {
    toast(text, { type: 'success', position: 'bottom-center' });
  },
  error: (text: string) => {
    toast(text, { type: 'error', position: 'bottom-center' });
  },
};
