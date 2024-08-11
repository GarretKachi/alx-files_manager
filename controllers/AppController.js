const redis = require('redis');
const dbClient = require('../utils/db'); // Assuming db.js is in utils folder

// Set up Redis client
const redisClient = redis.createClient();

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.connected;
    const dbAlive = dbClient.isAlive();

    return res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    return res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = AppController;

