import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import os from "os";

jest.setTimeout(30000);

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  // Provide Node's `os` adapter explicitly so mongodb doesn't call `import('os')`
  // inside Jest's VM context (which fails without --experimental-vm-modules).
  await mongoose.connect(mongoUri, {
    runtimeAdapters: { os },
  });
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();

  if (mongo) {
    await mongo.stop();
  }
});
