import Joi from 'joi';

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const getNotes = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNote = {
  params: Joi.object().keys({
    noteId: Joi.string().required(),
  }),
};

const updateNote = {
  params: Joi.object().keys({
    noteId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const deleteNote = {
  params: Joi.object().keys({
    noteId: Joi.string().required(),
  }),
};

export default {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
