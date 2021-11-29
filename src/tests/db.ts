import mongoose, { connections } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mon = new MongoMemoryServer()

// CONNECT TO DB
export const connectDB = async () => {
  const uri = await mon.getUri();
  const mongoseOpts = {
    dbName: "verifyMASTER"
  };
  await mongoose.connect(uri, mongoseOpts)
}

//DISCONNECT AND CLOSE
export const closeDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mon.stop()
}

//CLEAR AND REMOVE ALL DATA
export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}