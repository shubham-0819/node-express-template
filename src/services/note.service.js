import httpStatus from 'http-status';
import { Note } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * @param {Object} noteBody
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody) => {
  return Note.create(noteBody);
};

/**
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const queryNotes = async (filter, options) => {
  const notes = await Note.paginate(filter, options);
  return notes;
};

// /**
//  * @param {String} title
//  * @returns {Promise<Note>}
//  */
// const queryNotesByTitle = async (title) => {
//   const notes = await Note.find({ title });
//   return notes;
// };

// /**
//  * @param {ObjectId} id
//  * @returns {Promise<Note>}
//  */
// const getNoteById = async (id) => {
//   const note = Note.findById(id);
//   if (!note) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
//   }
//   return note;
// };

/**
 * @param {ObjectId} [id]
 * @param {String} [title]
 * @returns {Promise<Note[]>}
 */
const queryNote = async (id) => {
  const query = {};
  if (id) query._id = id;
  const notes = await Note.find(query);
  if (notes.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return notes;
};

/**
 * @param {ObjectId} noteId
 * @param {Object} updateBody
 * @returns {Promise<Note>}
 */
const updateNoteById = async (noteId, updateBody) => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

/**
 * @param {ObjectId} noteId
 * @returns {Promise<Note>}
 */
const deleteNoteById = async (noteId) => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  await note.remove();
  return note;
};

export default {
  createNote,
  queryNotes,
  queryNote,
  updateNoteById,
  deleteNoteById,
};
