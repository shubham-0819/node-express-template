import mongoose from 'mongoose';
import { expect } from 'chai';
import { toJSON } from '../../../../src/models/plugins/index.js';

describe('toJSON plugin', () => {
  let connection;

  beforeEach(() => {
    connection = mongoose.createConnection();
  });

  it('should replace _id with id', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('_id');
    expect(jsonDoc).to.have.property('id', doc._id.toString());
  });

  it('should remove __v', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('__v');
  });

  it('should remove createdAt and updatedAt', () => {
    const schema = mongoose.Schema({}, { timestamps: true });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('createdAt');
    expect(jsonDoc).to.not.have.property('updatedAt');
  });

  it('should remove any path set as private', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      private: { type: String, private: true },
    });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('private');
    expect(jsonDoc).to.have.property('public');
  });

  it('should remove any nested paths set as private', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      nested: {
        private: { type: String, private: true },
      },
    });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({
      public: 'some public value',
      nested: {
        private: 'some nested private value',
      },
    });
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('nested.private');
    expect(jsonDoc).to.have.property('public');
  });

  it('should also call the schema toJSON transform function', () => {
    const schema = mongoose.Schema(
      {
        public: { type: String },
        private: { type: String },
      },
      {
        toJSON: {
          transform: (doc, ret) => {
            // eslint-disable-next-line no-param-reassign
            delete ret.private;
          },
        },
      }
    );
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    const jsonDoc = doc.toJSON();
    expect(jsonDoc).to.not.have.property('private');
    expect(jsonDoc).to.have.property('public');
  });
});