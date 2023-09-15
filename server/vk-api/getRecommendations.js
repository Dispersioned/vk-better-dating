import { X_LOVINA_AGENT, X_SESSION_KEY } from '../config/consts.js';
import { readStream } from '../utils/readStream.js';

export async function getRecommendations(token, count) {
  const res = await fetch('https://dating.vk-apps.ru/api/dating.getRecommendedUsers', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'x-api-version': '1.7',
      'x-auth-token': token,
      'x-lovina-agent': X_LOVINA_AGENT,
      'x-session-key': X_SESSION_KEY,
      Referer: 'https://prod-app7058363-3c6312d9a263.pages-ac.vk-apps.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: JSON.stringify({
      count: count,
    }),
    method: 'POST',
  });

  const result = await readStream(res);
  const parsed = JSON.parse(result);
  if (!res.ok) throw parsed;
  return parsed;
}
