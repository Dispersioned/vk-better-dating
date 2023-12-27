import { readStream } from '../../utils/readStream.js';

export async function authSignIn(payload) {
  const fd = new FormData();
  fd.append('123', 123);
  fd.append('123', 123);
  fd.append('123', 123);
  fd.append('123', 123);

  fd.append('count', 5);
  fd.append('_token', token);
  fd.append('_agent', lovinaAgent);
  fd.append('_session', lovinaAgent);
  fd.append('_v', '1.9');

  const res = fetch('https://dating.vk-apps.ru/api/auth.signIn', {
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
    // body: '------WebKitFormBoundarydbyVXIpvXoQVVqtp\r\nContent-Disposition: form-data; name="launch_url"\r\n\r\n?vk_access_token_settings=&vk_app_id=7058363&vk_are_notifications_enabled=0&vk_experiment=eyI2NjQ1IjowfQ&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1703699691&vk_user_id=241538483&sign=LoR2lCJJovVHNTlXdMivXUZ3A6AROf1CiWYYIWvW-Zg\r\n------WebKitFormBoundarydbyVXIpvXoQVVqtp\r\nContent-Disposition: form-data; name="_agent"\r\n\r\nlove1 version:3.0.0 build:272 commit:00ea8e3ae env:production platform:desktop_web odr:0 client:0.0%2Fweb%2Fnone lang:ru tz:10800 vkid:241538483 screen:d%2F795x709%2F1.25\r\n------WebKitFormBoundarydbyVXIpvXoQVVqtp\r\nContent-Disposition: form-data; name="_session"\r\n\r\n241538483_1703699691733\r\n------WebKitFormBoundarydbyVXIpvXoQVVqtp\r\nContent-Disposition: form-data; name="_v"\r\n\r\n1.10\r\n------WebKitFormBoundarydbyVXIpvXoQVVqtp--\r\n',
    method: 'POST',
  });

  const result = await readStream(res);
  const parsed = JSON.parse(result);
  console.log('parsed', parsed);
  if (!res.ok) throw parsed;
  return parsed;
}
