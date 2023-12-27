export async function readStream(fetchResponse) {
  const reader = fetchResponse.body.getReader();
  const textDecoder = new TextDecoder();

  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = textDecoder.decode(value, { stream: true });
    result += chunk;
  }

  result = result.replace(/\u0026/gi, '&');

  return result;
}
