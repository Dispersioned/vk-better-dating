import express from 'express';
// import { addHandlers } from './addHandlers.js';
import { port } from './config/consts.js';
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

async function bootstrap() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    addHandlers(app);

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log('error: ' + err);
  }
}

bootstrap();

async function addHandlers(app) {
  app.post('/auth-vk-dating', async (req, res) => {
    const { authParams } = req.body;
    try {
      const authData = await fetchAuthData(authParams);

      return res.json(authData);
    } catch (e) {
      return res.status(404).json(e);
    }
  });
  app.post('/get-recommendations', async (req, res) => {
    const { vktoken, count, userId } = req.body;
    try {
      const { users, likes } = fetchUsersAndLikes({
        token: vktoken,
        VKID: userId,
      });

      return res.json({ users, likes });
    } catch (e) {
      return res.status(404).json(e);
    }
  });
}

async function fetchAuthData(launchUrl) {
  const authData = await authSignIn({ launchUrl });
  return authData;
}

async function fetchUsersAndLikes({ token, VKID }) {
  try {
    const lovinaAgent = createLovinaAgent(VKID);
    const sessionKey = createSessionKey(VKID);

    const users = await datingGetRecommendations({ count: 100, token, lovinaAgent, sessionKey });
    const recommendationUsers = users.users;

    await insertOrUpdateUsers(recommendationUsers);

    const likes = await datingGetLikeToYouUsers({ count: 200, token, lovinaAgent, sessionKey });
    const usersWhoLikedMe = likes.users;

    const likesMeta = await findUsersByPreviewUrl(usersWhoLikedMe);

    return {
      users,
      likes: likesMeta,
    };
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
    const likesMeta = [];

    for (const like of likes) {
      const previewUrl = like.preview_url;
      const matchedUsers = await UserModel.find({
        stories: {
          $elemMatch: {
            blur_url: previewUrl,
          },
        },
      });

      likesMeta.push({
        likeUser: like,
        matchedUser: matchedUsers[0] || null,
      });

      return likesMeta;
    }
  } catch (error) {
    console.error('Error finding users by preview_url:', error.message);
  }
}
