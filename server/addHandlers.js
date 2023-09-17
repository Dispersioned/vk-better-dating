import { db } from './modules/db.js';
import { authVkDating } from './vk-api/authVkDating.js';
import { getLikes } from './vk-api/getLikes.js';
import { getRecommendations } from './vk-api/getRecommendations.js';

export function addHandlers(app) {
  app.post('/auth-vk-dating', async (req, res) => {
    const { authParams } = req.body;
    try {
      const data = await authVkDating(authParams);
      return res.json(data);
    } catch (e) {
      return res.status(404).json(e);
    }
  });

  app.post('/recommendations', async (req, res) => {
    const { vktoken, count } = req.body;
    try {
      const recommendations = await getRecommendations(vktoken, count || 100);

      const recommendationsCollection = db.getCollection('recommendations');
      const uniqueItems = recommendationsCollection.insertUnique(recommendations.users);
      if (uniqueItems.length) await db.save();

      return res.json(recommendations);
    } catch (e) {
      return res.status(404).json(e);
    }
  });

  app.post('/likes', async (req, res) => {
    const { vktoken } = req.body;
    try {
      const likes = await getLikes(vktoken);

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
}
