// import express from 'express';
// import { addHandlers } from './addHandlers.js';
// import { port } from './config/consts.js';
// import { db } from './modules/db.js';

import { mongoose } from 'mongoose';
import { UserModel } from './schema/user.js';
import { authSignIn } from './vk-api/1.10/auth.signIn.js';
import { datingGetLikeToYouUsers } from './vk-api/1.10/dating.getLikeToYouUsers.js';
import { datingGetRecommendations } from './vk-api/1.7/dating.getRecommendations.js';
import { createLovinaAgent } from './utils/createLovinaAgent.js';
import { createSessionKey } from './utils/createSessionKey.js';

// async function start() {
// await db.init();
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
// addHandlers(app);
// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
// }

// start();

const DB_STARTUP_OPTIONS = {};

async function connectdb() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', DB_STARTUP_OPTIONS);
    start();
  } catch (err) {
    console.log('error: ' + err);
  }
}

connectdb();

async function start() {
  try {
    const launchUrl =
      'vk_access_token_settings=&vk_app_id=7058363&vk_are_notifications_enabled=0&vk_experiment=eyI2NjQ1IjowfQ&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1703702141&vk_user_id=241538483&sign=yGI4eJ57taEj8JADTMgwzuZnD2ArbU_hcI7rIBFZRSY';

    const authData = await authSignIn({ launchUrl });
    console.log('authData', authData);
    const token = authData.token;
    const VKID = authData.vk_id;
    const lovinaAgent = createLovinaAgent(VKID);
    const sessionKey = createSessionKey(VKID);

    const users = await datingGetRecommendations({ count: 100, token, lovinaAgent, sessionKey });
    const recommendationUsers = users.users;

    await insertOrUpdateUsers(recommendationUsers);

    const likes = await datingGetLikeToYouUsers({ count: 200, token, lovinaAgent, sessionKey });
    const usersWhoLikedMe = likes.users;

    const matchedUsers = await findUsersByPreviewUrl(usersWhoLikedMe);
    // console.log('matchedUsers', matchedUsers);
  } catch (e) {
    console.log('ERR:', e);
  }
}

async function insertOrUpdateUsers(users) {
  try {
    // todo: make user update only if deep equal to save SSD resource
    const bulkOps = users.map((user) => ({
      updateOne: {
        filter: { id: user.id }, // Assuming 'id' is a unique key
        update: user,
        upsert: true,
      },
    }));

    const result = await UserModel.bulkWrite(bulkOps);

    console.log('Users inserted or updated:', result);
  } catch (error) {
    console.error('Error inserting or updating users:', error.message);
  }
}

async function findUsersByPreviewUrl(likes) {
  try {
    const previewUrls = likes.map((like) => like.preview_url);

    const matchingUsers = await UserModel.find({
      stories: {
        $elemMatch: {
          blur_url: { $in: previewUrls },
        },
      },
    });

    return matchingUsers;
  } catch (error) {
    console.error('Error finding users by preview_url:', error.message);
  }
}
