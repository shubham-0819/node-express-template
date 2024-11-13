import mongoose from 'mongoose';
import config from '../../src/config/config.js';

const setupTestDB = () => {
  before(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  beforeEach(async () => {
    Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  after(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
