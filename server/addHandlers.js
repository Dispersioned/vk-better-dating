import { db } from './modules/db.js';
import { getLikes } from './vk-api/getLikes.js';
import { getRecommendations } from './vk-api/getRecommendations.js';

export function addHandlers(app) {
  app.post('/recommendations', async (req, res) => {
    const { vktoken, count } = req.body;
    try {
      const recommendations = await getRecommendations(vktoken, count || 100);
      return res.json(recommendations);
    } catch (e) {
      return res.status(404).json(e);
    }
    return res.json(recommendations);
  });

  app.post('/likes', async (req, res) => {
    const { vktoken } = req.body;
    try {
      const likes = await getLikes(vktoken);
      return res.json(likes);
    } catch (e) {
      return res.status(404).json(e);
    }
  });
}
