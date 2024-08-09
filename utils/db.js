const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file if available
dotenv.config();

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.client.connect()
            .then(() => {
                this.db = this.client.db(database);
            })
            .catch((error) => {
                console.error(`MongoDB connection error: ${error}`);
            });
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }

    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;

