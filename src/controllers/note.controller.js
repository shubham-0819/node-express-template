import httpStatus from 'http-status';
import Note from '../models/note.model.js';
import ApiError from '../utils/ApiError.js';
import noteService from '../services/note.service.js';
import pick from '../utils/pick.js';

const createNote = async (req, res) => {
  try {
    const note = await noteService.createNote({
      title: req.body.title,
      body: req.body.body,
    });
    res.status(httpStatus.CREATED).json(note);
  } catch (error) {
    const apiErr = new ApiError(error);
    res.status(apiErr.statusCode).json(apiErr);
  }
};

const getNote = async (req, res) => {
  try {
    const note = await noteService.queryNote(req.params.noteId);
    res.json(note);
  } catch (error) {
    const apiErr = new ApiError(error);
    res.status(apiErr.statusCode).json(apiErr);
  }
};

const getNotes = async (req, res) => {
  try {
    const filter = pick(req.query, ['title']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const notes = await noteService.queryNotes(filter, options);
    res.json(notes);
  } catch (error) {
    const apiErr = new ApiError(error);
    res.status(apiErr.statusCode).json(apiErr);
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNoteById(req.params.noteId, req.body);
    res.json(note);
  } catch (error) {
    const apiErr = new ApiError(error);
    res.status(apiErr.statusCode).json(apiErr);
  }
};

const deleteNote = async (req, res) => {
  try {
    await noteService.deleteNoteById(req.params.noteId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    const apiErr = new ApiError(error);
    res.status(apiErr.statusCode).json(apiErr);
  }
};

export default {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
