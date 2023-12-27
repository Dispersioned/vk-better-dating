export function getAxiosErrorMessage(e: unknown) {
  const error = e as any;

  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message) return error.message;

  return null;
}
