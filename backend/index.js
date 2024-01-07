import express from 'express';
import { port } from './config/consts.js';
import { mongoose } from 'mongoose';
import { UserModel } from './schema/user.js';
import { authSignIn } from './vk-api/1.10/auth.signIn.js';
import { datingGetLikeToYouUsers } from './vk-api/1.10/dating.getLikeToYouUsers.js';
import { datingGetRecommendations } from './vk-api/1.7/dating.getRecommendations.js';
import { createLovinaAgent } from './utils/createLovinaAgent.js';
import { createSessionKey } from './utils/createSessionKey.js';
import { like } from './vk-api/old/like.js';
import { dislike } from './vk-api/old/dislike.js';
import { LikeModel } from './schema/like.js';

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
    const { launchUrl } = req.body;
    try {
      const authData = await fetchAuthData(launchUrl);

      return res.json(authData);
    } catch (e) {
      return res.status(404).json(e);
    }
  });
  app.post('/get-recommendations', async (req, res) => {
    const { token, VKID } = req.body;
    try {
      const { feed, likes, expiredLikes } = await fetchUsersAndLikes({
        token,
        VKID,
      });

      return res.json({ feed, likes, expiredLikes });
    } catch (e) {
      return res.status(404).json(e);
    }
  });

  app.post('/like', async (req, res) => {
    const { vktoken, userId, recipientId } = req.body;
    try {
      const result = await like({
        token: vktoken,
        recipientId,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(404).json(e);
    }
  });

  app.post('/dislike', async (req, res) => {
    const { vktoken, userId, recipientId } = req.body;
    try {
      const result = await dislike({
        token: vktoken,
        recipientId,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(404).json(e);
    }
  });
}

async function fetchAuthData(launchUrl) {
  const authData = await authSignIn({ launchUrl });
  return authData;
}

async function saveLikesInfo(usersWhoLikedMe) {
  try {
    const withUniqueIds = usersWhoLikedMe.map((user) => ({ ...user, id: user.extra.hash }));

    const bulkOps = withUniqueIds.map((likeUser) => ({
      updateOne: {
        filter: { id: likeUser.id }, // Assuming 'id' is a unique key
        update: likeUser,
        upsert: true,
      },
    }));

    const result = await LikeModel.bulkWrite(bulkOps);
    return result;
  } catch (error) {
    console.log('UNIQUE LIKE KEY ERROR', error);
    throw error;
  }
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

    saveLikesInfo(usersWhoLikedMe);
    const actualLikesIDs = usersWhoLikedMe.map((likeUser) => likeUser.extra.hash);

    const expiredLikesMeta = await getExpiredLikes(actualLikesIDs);
    const expiredLikes = await findUsersByPreviewUrl(expiredLikesMeta);

    const likesMeta = await findUsersByPreviewUrl(usersWhoLikedMe);

    return {
      feed: users,
      likes: likesMeta,
      expiredLikes,
    };
  } catch (e) {
    console.log('ERR:', e);
  }
}

async function getExpiredLikes(idsToExclude) {
  try {
    const result = await LikeModel.find({ id: { $nin: idsToExclude } });
    return result;
  } catch (err) {
    console.log('err', err);
    throw err;
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
    }
    return likesMeta;
  } catch (error) {
    console.error('Error finding users by preview_url:', error.message);
  }
}
