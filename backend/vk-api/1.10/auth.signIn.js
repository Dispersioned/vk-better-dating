import { readStream } from '../../utils/readStream.js';

authSignIn({
  launchUrl:
    'vk_access_token_settings=&vk_app_id=7058363&vk_are_notifications_enabled=0&vk_experiment=eyI2NjQ1IjowfQ&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1703699691&vk_user_id=241538483&sign=LoR2lCJJovVHNTlXdMivXUZ3A6AROf1CiWYYIWvW-Zg',
});

export async function authSignIn(payload) {
  const fd = new FormData();
  fd.append('launch_url', '?' + payload.launchUrl);
  fd.append('_agent', payload.agent || '');
  fd.append('_session', payload.session || '');
  fd.append('_V', '1.10');

  const res = await fetch('https://dating.vk-apps.ru/api/auth.signIn', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarydbyVXIpvXoQVVqtp',
      pragma: 'no-cache',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      Referer: 'https://prod-app7058363-ce653371913c.pages-ac.vk-apps.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: fd,
    method: 'POST',
  });

  const result = await readStream(res);
  const parsed = JSON.parse(result);
  console.log('parsed', parsed);
  if (!res.ok) throw parsed;
  return parsed;
}
