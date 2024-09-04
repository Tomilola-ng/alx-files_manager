/* eslint-disable no-return-await */
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return await usersCollection.countDocuments();
  }

  async nbFiles() {
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return await filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
