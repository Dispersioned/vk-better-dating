import { db } from './modules/db.js';
import { serializeRecommendations } from './serializers/serializeRecommendations.js';
import { createLovinaAgent } from './utils/createLovinaAgent.js';
import { createSessionKey } from './utils/createSessionKey.js';
import { authVkDating } from './vk-api/authVkDating.js';
import { dislike } from './vk-api/dislike.js';
import { getLikes } from './vk-api/getLikes.js';
import { getRecommendations } from './vk-api/getRecommendations.js';
import { like } from './vk-api/like.js';

export function addHandlers(app) {
  app.post('/auth-vk-dating', async (req, res) => {
    const { authParams } = req.body;
    try {
      const data = await authVkDating({
        authParams,
        //! я не могу достать эти данные
        // имеет вид 543523438_1694617533288
        sessionKey: '',
        // имеет вид love1 version:3.0.0 build:237 commit:b58be0646 env:production platform:desktop_web odr:0 client:0.0%2Fweb%2Fnone lang:ru tz:10800 vkid:543523438
        lovinaAgent: '',
      });
      return res.json(data);
    } catch (e) {
      return res.status(404).json(e);
    }
  });

  app.post('/recommendations', async (req, res) => {
    const { vktoken, count, userId } = req.body;
    try {
      const recommendations = await getRecommendations({
        token: vktoken,
        count: count || 100,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      const serialized = serializeRecommendations(recommendations);

      const recommendationsCollection = db.getCollection('recommendations');
      const uniqueItems = recommendationsCollection.insertUnique(serialized.users);
      if (uniqueItems.length) await db.save();

      return res.json(serialized);
    } catch (e) {
      return res.status(404).json(e);
    }
  });

  app.post('/likes', async (req, res) => {
    const { vktoken, userId } = req.body;
    try {
      const likes = await getLikes({
        token: vktoken,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      function serializeToDb(likes) {
        const copy = {
          ...likes,
          users: [...likes.users],
        };
        copy.users = copy.users.map((user) => ({
          ...user,
          id: user.extra.hash,
        }));
        return copy;
      }

      const serialized = serializeToDb(likes);
      const likesCollection = db.getCollection('likes');
      const uniqueItems = likesCollection.insertUnique(serialized.users);

      if (uniqueItems.length) await db.save();

      return res.json(serialized);
    } catch (e) {
      console.log(e);
      return res.status(404).json(e);
    }
  });

  app.post('/like', async (req, res) => {
    const { vktoken, userId, recipientId } = req.body;
    try {
      const likedInfo = await like({
        token: vktoken,
        recipientId,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      console.log('liked', likedInfo);

      const serialized = {
        userId: recipientId,
        isMatchMissed: likedInfo.is_matched_missed,
        date: Date.now(),
      };

      const likedColection = db.getCollection('liked');
      likedColection.insert(serialized);

      const recommendationsCollection = db.getCollection('recommendations');
      const user = recommendationsCollection.findById(recipientId);
      if (user) {
        // превалирует над пропущенным
        user.isLiked = true;
        // user.isSkipped = false;
        const savedUser = recommendationsCollection.updateById(user.id, user);
        console.log('savedUser', savedUser);
        await db.save();
      }

      return res.json(serialized);
    } catch (e) {
      console.log(e);
      return res.status(404).json(e);
    }
  });

  app.post('/dislike', async (req, res) => {
    const { vktoken, userId, recipientId } = req.body;
    try {
      const dislikeInfo = await dislike({
        token: vktoken,
        recipientId,
        sessionKey: createSessionKey(userId),
        lovinaAgent: createLovinaAgent(userId),
      });

      console.log('disliked', dislikeInfo);

      const serialized = {
        userId: recipientId,
        isMatchMissed: dislikeInfo.is_matched_missed,
        date: Date.now(),
      };

      const dislikedColection = db.getCollection('disliked');
      dislikedColection.insert(serialized);

      const recommendationsCollection = db.getCollection('recommendations');
      const user = recommendationsCollection.findById(recipientId);
      if (user) {
        // не трогаем, лайк сохраняется всегда
        // но это не точно
        // user.isLiked = ;
        user.isSkipped = true;
        const savedUser = recommendationsCollection.updateById(user.id, user);
        console.log('savedUser', savedUser);
        await db.save();
      }
      return res.json(serialized);
    } catch (e) {
      console.log(e);
      return res.status(404).json(e);
    }
  });
}
