import mongoose from 'mongoose';
import faker from 'faker';
import { Note } from '../../src/models/index.js';

const noteOne = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

const noteTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

const noteThree = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

const insertNotes = async (notes) => {
  await Note.insertMany(notes.map((note) => ({ ...note })));
};

export { noteOne, noteTwo, noteThree, insertNotes };
