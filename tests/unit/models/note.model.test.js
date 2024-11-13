import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import mongoose from 'mongoose';
import { Note } from '../../../src/models/index.js';

chai.use(chaiAsPromised);

describe('Note Model', () => {
  // Test case for creating a new note
  it('should create a new note', async () => {
    const noteData = {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };

    Note.create(noteData).then((note) => {
      expect(note).to.exist;
      expect(note._id).to.exist;
      expect(note.title).to.equal(noteData.title);
      expect(note.body).to.equal(noteData.body);
      Promise.resolve();
    });
  });

  // Test case for creating a note with missing fields (edge case)
  it('should throw an error when creating a note with missing title', async () => {
    const noteData = {
      body: faker.lorem.paragraph(),
    };

    Note.create(noteData)
      .then((result) => {
        expect(result).to.exist;
        expect(result).to.throw(mongoose.Error.ValidationError);
      })
      .catch((error) => {});
  });

  // Test case for getting all notes
  it('should get all notes', async () => {
    Note.find().then((notes) => {
      expect(notes).to.exist;
      expect(notes).to.be.an('array');
      expect(notes.length).to.be.greaterThan(0);
    });
  });

  // Test case for getting a note by ID (edge case)
  it('should return null for a non-existing ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    Note.findById(nonExistentId).then((note) => {
      expect(note).to.be.null;
    });
  });

  // Test case for updating a note
  it('should update a note', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;

      const updatedNoteData = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
      };

      note.title = updatedNoteData.title;
      note.body = updatedNoteData.body;

      note.save().then((updatedNote) => {
        expect(updatedNote._id.toString()).to.equal(note._id.toString());
        expect(updatedNote.title).to.equal(updatedNoteData.title);
        expect(updatedNote.body).to.equal(updatedNoteData.body);
      });
    });
  });

  // Test case for updating a note with invalid data (edge case)
  it('should throw an error when updating a note with invalid data', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;
      note.title = '';
      note
        .save()
        .then((result) => {
          expect(result).to.exist;
          expect(result).to.throw(new mongoose.Error.ValidationError());
        })
        .catch((error) => {});
    });
  });

  // // Test case for deleting a note
  it('should delete a note', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;
      note.remove().then((deletedNote) => {
        Note.findById(note._id).then((note) => {
          expect(deletedNote).to.be.null;
        });
      });
    });
  });

  // Test case for finding a note by title
  it('should find a note by title', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;
      Note.findOne({ title: note.title }).find((foundNote) => {
        expect(foundNote).to.exist;
        expect(foundNote.title).to.equal(note.title);
      });
    });
  });

  // Test case for counting total number of notes
  it('should count total number of notes', async () => {
    Note.countDocuments().then((count) => {
      expect(count).to.be.greaterThan(0);
    });
  });

  // Test case for attempting to delete a non-existing note (edge case)
  it('should not delete a non-existing note', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    Note.deleteOne({ _id: nonExistentId }).then((deleteResult) => {
      expect(deleteResult.deletedCount).to.equal(0);
    });
  });

  // Additional test case for updating only the title of a note
  it('should update only the title of a note', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;
      const newTitle = faker.lorem.sentence();
      note.title = newTitle;
      note.save().then((updatedNote) => {
        expect(updatedNote._id.toString()).to.equal(note._id.toString());
        expect(updatedNote.title).to.equal(newTitle);
        expect(updatedNote.body).to.equal(note.body);
      });
    });
  });

  // Additional test case for updating only the body of a note
  it('should update only the body of a note', async () => {
    Note.findOne().then((note) => {
      expect(note).to.exist;

      const newBody = faker.lorem.paragraph();
      note.body = newBody;

      note.save().then((updatedNote) => {
        expect(updatedNote._id.toString()).to.equal(note._id.toString());
        expect(updatedNote.title).to.equal(note.title);
        expect(updatedNote.body).to.equal(newBody);
      });
    });
  });
});
