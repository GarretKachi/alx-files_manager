const crypto = require('crypto');
const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const url = 'mongodb://localhost:27017';
const dbName = 'yourDatabaseName';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);
      const usersCollection = db.collection('users');

      // Check if the email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      // Create the new user
      const newUser = {
        email,
        password: hashedPassword
      };

      const result = await usersCollection.insertOne(newUser);

      // Return the new user with only email and id
      return res.status(201).json({ email, id: result.insertedId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }
}

module.exports = UsersController;

